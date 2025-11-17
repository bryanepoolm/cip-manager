import { ref, onMounted, type Ref } from 'vue';

// --- Interfaces para el tipado ---

interface CountryOption {
    label: string;
    value: string;
}

interface ApiCountry {
    name: {
        common: string;
    };
}

// --- Caché ---
// El caché a nivel de módulo para no volver a pedir los países
const countriesCache: Ref<CountryOption[] | null> = ref(null);


export function useCountries() {
    const countries: Ref<CountryOption[]> = ref([]);
    const isLoading: Ref<boolean> = ref(false);

    const fetchCountries = async (): Promise<void> => {
        // Si ya tenemos los países en caché, los usamos
        if (countriesCache.value) {
            countries.value = countriesCache.value;
            return;
        }

        // Si no, los pedimos a la API
        isLoading.value = true;
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
            if (!response.ok) {
                throw new Error('Failed to fetch countries');
            }
            const data: ApiCountry[] = await response.json();

            // Mapear y ordenar los datos para el formato que espera PrimeVue Dropdown
            const formattedCountries = data
                .map((country: ApiCountry) => ({
                    label: country.name.common,
                    value: country.name.common,
                }))
                .sort((a: CountryOption, b: CountryOption) => a.label.localeCompare(b.label));

            countries.value = formattedCountries;
            countriesCache.value = formattedCountries; // Guardar en caché

        } catch (error) {
            console.error("Error fetching countries:", error);
            // Opcional: manejar el estado de error
        } finally {
            isLoading.value = false;
        }
    };

    // Llamar a la función cuando el componente que usa el composable se monta
    onMounted(fetchCountries);

    return {
        countries,
        isLoading,
    };
}