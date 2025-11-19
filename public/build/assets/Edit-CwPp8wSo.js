import{L as N,M as Q,a as s,o as d,F as E,I,m as c,b as a,C as h,j as y,J as W,r as S,K as X,y as Y,N as Z,e as l,u as e,h as ee,w as g,t as x,G as te,O as D,i as P,P as ne,D as ie}from"./app-BYcpfCCx.js";import{a as A,f as ae,s as oe,_ as le}from"./AppLayout.vue_vue_type_script_setup_true_lang-B7Fb-TMU.js";import{s as re,a as b,b as se,c as $}from"./index-DkUltBf0.js";import{u as de,_ as f,s as pe,a as O,b as F,c as me}from"./useCountries-IFrhMCMh.js";import{s as ce}from"./index-Xh5KyW5y.js";import{_ as V}from"./InputError-CH1juVzZ.js";var ue=`
    .p-timeline {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        direction: ltr;
    }

    .p-timeline-left .p-timeline-event-opposite {
        text-align: right;
    }

    .p-timeline-left .p-timeline-event-content {
        text-align: left;
    }

    .p-timeline-right .p-timeline-event {
        flex-direction: row-reverse;
    }

    .p-timeline-right .p-timeline-event-opposite {
        text-align: left;
    }

    .p-timeline-right .p-timeline-event-content {
        text-align: right;
    }

    .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {
        flex-direction: row-reverse;
    }

    .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {
        text-align: right;
    }

    .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {
        text-align: left;
    }

    .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {
        text-align: left;
    }

    .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {
        text-align: right;
    }

    .p-timeline-vertical .p-timeline-event-opposite,
    .p-timeline-vertical .p-timeline-event-content {
        padding: dt('timeline.vertical.event.content.padding');
    }

    .p-timeline-vertical .p-timeline-event-connector {
        width: dt('timeline.event.connector.size');
    }

    .p-timeline-event {
        display: flex;
        position: relative;
        min-height: dt('timeline.event.min.height');
    }

    .p-timeline-event:last-child {
        min-height: 0;
    }

    .p-timeline-event-opposite {
        flex: 1;
    }

    .p-timeline-event-content {
        flex: 1;
    }

    .p-timeline-event-separator {
        flex: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .p-timeline-event-marker {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        align-self: baseline;
        border-width: dt('timeline.event.marker.border.width');
        border-style: solid;
        border-color: dt('timeline.event.marker.border.color');
        border-radius: dt('timeline.event.marker.border.radius');
        width: dt('timeline.event.marker.size');
        height: dt('timeline.event.marker.size');
        background: dt('timeline.event.marker.background');
    }

    .p-timeline-event-marker::before {
        content: ' ';
        border-radius: dt('timeline.event.marker.content.border.radius');
        width: dt('timeline.event.marker.content.size');
        height: dt('timeline.event.marker.content.size');
        background: dt('timeline.event.marker.content.background');
    }

    .p-timeline-event-marker::after {
        content: ' ';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: dt('timeline.event.marker.border.radius');
        box-shadow: dt('timeline.event.marker.content.inset.shadow');
    }

    .p-timeline-event-connector {
        flex-grow: 1;
        background: dt('timeline.event.connector.color');
    }

    .p-timeline-horizontal {
        flex-direction: row;
    }

    .p-timeline-horizontal .p-timeline-event {
        flex-direction: column;
        flex: 1;
    }

    .p-timeline-horizontal .p-timeline-event:last-child {
        flex: 0;
    }

    .p-timeline-horizontal .p-timeline-event-separator {
        flex-direction: row;
    }

    .p-timeline-horizontal .p-timeline-event-connector {
        width: 100%;
        height: dt('timeline.event.connector.size');
    }

    .p-timeline-horizontal .p-timeline-event-opposite,
    .p-timeline-horizontal .p-timeline-event-content {
        padding: dt('timeline.horizontal.event.content.padding');
    }

    .p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {
        flex-direction: column-reverse;
    }

    .p-timeline-bottom .p-timeline-event {
        flex-direction: column-reverse;
    }
`,ve={root:function(r){var p=r.props;return["p-timeline p-component","p-timeline-"+p.align,"p-timeline-"+p.layout]},event:"p-timeline-event",eventOpposite:"p-timeline-event-opposite",eventSeparator:"p-timeline-event-separator",eventMarker:"p-timeline-event-marker",eventConnector:"p-timeline-event-connector",eventContent:"p-timeline-event-content"},fe=N.extend({name:"timeline",style:ue,classes:ve}),ge={name:"BaseTimeline",extends:A,props:{value:null,align:{mode:String,default:"left"},layout:{mode:String,default:"vertical"},dataKey:null},style:fe,provide:function(){return{$pcTimeline:this,$parentInstance:this}}};function C(i){"@babel/helpers - typeof";return C=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},C(i)}function M(i,r,p){return(r=be(r))in i?Object.defineProperty(i,r,{value:p,enumerable:!0,configurable:!0,writable:!0}):i[r]=p,i}function be(i){var r=he(i,"string");return C(r)=="symbol"?r:r+""}function he(i,r){if(C(i)!="object"||!i)return i;var p=i[Symbol.toPrimitive];if(p!==void 0){var _=p.call(i,r);if(C(_)!="object")return _;throw new TypeError("@@toPrimitive must return a primitive value.")}return(r==="string"?String:Number)(i)}var j={name:"Timeline",extends:ge,inheritAttrs:!1,methods:{getKey:function(r,p){return this.dataKey?Q(r,this.dataKey):p},getPTOptions:function(r,p){return this.ptm(r,{context:{index:p,count:this.value.length}})}},computed:{dataP:function(){return ae(M(M({},this.layout,this.layout),this.align,this.align))}}},ye=["data-p"],xe=["data-p"],_e=["data-p"],Ve=["data-p"],ke=["data-p"],we=["data-p"],$e=["data-p"];function Ce(i,r,p,_,z,m){return d(),s("div",c({class:i.cx("root")},i.ptmi("root"),{"data-p":m.dataP}),[(d(!0),s(E,null,I(i.value,function(v,n){return d(),s("div",c({key:m.getKey(v,n),class:i.cx("event")},{ref_for:!0},m.getPTOptions("event",n),{"data-p":m.dataP}),[a("div",c({class:i.cx("eventOpposite",{index:n})},{ref_for:!0},m.getPTOptions("eventOpposite",n),{"data-p":m.dataP}),[h(i.$slots,"opposite",{item:v,index:n})],16,_e),a("div",c({class:i.cx("eventSeparator")},{ref_for:!0},m.getPTOptions("eventSeparator",n),{"data-p":m.dataP}),[h(i.$slots,"marker",{item:v,index:n},function(){return[a("div",c({class:i.cx("eventMarker")},{ref_for:!0},m.getPTOptions("eventMarker",n),{"data-p":m.dataP}),null,16,ke)]}),n!==i.value.length-1?h(i.$slots,"connector",{key:0,item:v,index:n},function(){return[a("div",c({class:i.cx("eventConnector")},{ref_for:!0},m.getPTOptions("eventConnector",n),{"data-p":m.dataP}),null,16,we)]}):y("",!0)],16,Ve),a("div",c({class:i.cx("eventContent")},{ref_for:!0},m.getPTOptions("eventContent",n),{"data-p":m.dataP}),[h(i.$slots,"content",{item:v,index:n})],16,$e)],16,xe)}),128))],16,ye)}j.render=Ce;var ze=`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`,Se={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},Pe=N.extend({name:"card",style:ze,classes:Se}),Te={name:"BaseCard",extends:A,style:Pe,provide:function(){return{$pcCard:this,$parentInstance:this}}},q={name:"Card",extends:Te,inheritAttrs:!1};function Ue(i,r,p,_,z,m){return d(),s("div",c({class:i.cx("root")},i.ptmi("root")),[i.$slots.header?(d(),s("div",c({key:0,class:i.cx("header")},i.ptm("header")),[h(i.$slots,"header")],16)):y("",!0),a("div",c({class:i.cx("body")},i.ptm("body")),[i.$slots.title||i.$slots.subtitle?(d(),s("div",c({key:0,class:i.cx("caption")},i.ptm("caption")),[i.$slots.title?(d(),s("div",c({key:0,class:i.cx("title")},i.ptm("title")),[h(i.$slots,"title")],16)):y("",!0),i.$slots.subtitle?(d(),s("div",c({key:1,class:i.cx("subtitle")},i.ptm("subtitle")),[h(i.$slots,"subtitle")],16)):y("",!0)],16)):y("",!0),a("div",c({class:i.cx("content")},i.ptm("content")),[h(i.$slots,"content")],16),i.$slots.footer?(d(),s("div",c({key:1,class:i.cx("footer")},i.ptm("footer")),[h(i.$slots,"footer")],16)):y("",!0)],16)],16)}q.render=Ue;const Ee={class:"max-w-2xl mx-auto"},De={class:"mb-8"},Oe={class:"text-3xl font-bold text-gray-900"},Fe={class:"bg-white rounded-lg shadow-sm border border-gray-200 p-8"},Me={class:"grid grid-cols-1 gap-6"},Ne={class:"flex flex-wrap gap-4 mt-2"},Ie={class:"flex items-center gap-2"},Ae={class:"flex items-center gap-2"},je={class:"flex items-center gap-2"},qe={class:"flex items-center gap-2"},Ke={class:"flex items-center gap-2"},Le={class:"flex flex-wrap gap-4 mt-2"},Be={class:"flex items-center gap-2"},Ge={class:"flex items-center gap-2"},Re={class:"flex items-center gap-2"},He={class:"flex items-center gap-2"},Je={key:0},Qe={class:"border rounded-md p-2 space-y-2"},We={class:"flex items-center gap-2"},Xe=["href"],Ye=["href"],Ze={class:"flex items-center justify-end mt-8"},et={key:0,class:"mt-12"},tt={key:0,class:"pi pi-check"},nt={key:1,class:"pi pi-spin pi-spinner"},it={key:2,class:"pi pi-history"},at={key:3,class:"pi pi-times"},ot={class:"capitalize"},lt={class:"flex flex-col gap-4"},rt={class:"font-semibold capitalize"},st={class:"font-semibold capitalize"},gt={__name:"Edit",props:{exportacion:{type:Object,required:!0}},setup(i){const r=i,p=W(),{countries:_,isLoading:z}=de(),m=[{title:"Exportaciones",href:"/exportaciones"},{title:"Editar",href:`/exportaciones/${r.exportacion.id}/edit`}],v=S([...r.exportacion.documentos]),n=X({_method:"PUT",fecha:new Date(r.exportacion.fecha),clave:r.exportacion.clave,origen:r.exportacion.origen,destino:r.exportacion.destino,descripcion_carga:r.exportacion.descripcion_carga,tipo_carga:r.exportacion.tipo_carga,tipo_envio:r.exportacion.tipo_envio,estado:r.exportacion.estado,bitacora_nota:"",nuevos_documentos:[],documentos_a_eliminar:[]}),k=S(!1),T=S(null),U=S(!1);Y(()=>n.estado,(u,t)=>{U.value||u!==t&&t!==null&&(T.value=t,k.value=!0)});function K(){k.value=!1}function L(){U.value=!0,n.estado=T.value,n.bitacora_nota="",k.value=!1,ie(()=>{U.value=!1})}const B=u=>{n.nuevos_documentos=u.files},G=u=>{const t=n.nuevos_documentos.findIndex(w=>w.name===u.file.name&&w.size===u.file.size);t!==-1&&n.nuevos_documentos.splice(t,1)},R=()=>{n.nuevos_documentos=[]},H=u=>{n.documentos_a_eliminar.includes(u)||n.documentos_a_eliminar.push(u),v.value=v.value.filter(t=>t.id!==u)},J=()=>{if(n.estado!==r.exportacion.estado&&!n.bitacora_nota){p.add({severity:"warn",summary:"Nota Requerida",detail:"Debes agregar una nota para el cambio de estado.",life:3e3}),k.value=!0;return}n.post(`/exportaciones/${r.exportacion.id}`,{forceFormData:!0,onSuccess:()=>{},onError:u=>{p.add({severity:"error",summary:"Error de Validación",detail:"Por favor, revisa los campos del formulario.",life:3e3})}})};return(u,t)=>{const w=Z("tooltip");return d(),s(E,null,[l(e(ee),{title:"Editar Exportación"}),l(le,{breadcrumbs:m},{default:g(()=>[l(e(oe)),a("div",Ee,[a("div",De,[a("h2",Oe," Editar Exportación "+x(i.exportacion.clave),1),t[17]||(t[17]=a("p",{class:"mt-1 text-sm text-gray-600"}," Modifica los datos del registro y gestiona los documentos adjuntos. ",-1))]),a("div",Fe,[a("form",{onSubmit:te(J,["prevent"])},[a("div",Me,[a("div",null,[l(f,{for:"fecha",value:"Fecha de Exportación"}),l(e(pe),{id:"fecha",modelValue:e(n).fecha,"onUpdate:modelValue":t[0]||(t[0]=o=>e(n).fecha=o),dateFormat:"dd/mm/yy",class:"",invalid:!!e(n).errors.fecha},null,8,["modelValue","invalid"]),l(V,{class:"mt-2",message:e(n).errors.fecha},null,8,["message"])]),a("div",null,[l(f,{for:"clave",value:"Clave de Exportación"}),l(e(re),{id:"clave",modelValue:e(n).clave,"onUpdate:modelValue":t[1]||(t[1]=o=>e(n).clave=o),type:"text",class:"w-full",invalid:!!e(n).errors.clave,disabled:""},null,8,["modelValue","invalid"]),l(V,{class:"mt-2",message:e(n).errors.clave},null,8,["message"])]),a("div",null,[l(f,{for:"tipo_envio",value:"Tipo de Envío"}),a("div",Ne,[a("div",Ie,[l(e(b),{modelValue:e(n).tipo_envio,"onUpdate:modelValue":t[2]||(t[2]=o=>e(n).tipo_envio=o),inputId:"aéreo",name:"tipo_envio",value:"aéreo"},null,8,["modelValue"]),t[18]||(t[18]=a("label",{for:"aéreo"},"Aéreo",-1))]),a("div",Ae,[l(e(b),{modelValue:e(n).tipo_envio,"onUpdate:modelValue":t[3]||(t[3]=o=>e(n).tipo_envio=o),inputId:"marítimo",name:"tipo_envio",value:"marítimo"},null,8,["modelValue"]),t[19]||(t[19]=a("label",{for:"marítimo"},"Marítimo",-1))]),a("div",je,[l(e(b),{modelValue:e(n).tipo_envio,"onUpdate:modelValue":t[4]||(t[4]=o=>e(n).tipo_envio=o),inputId:"tren",name:"tipo_envio",value:"tren"},null,8,["modelValue"]),t[20]||(t[20]=a("label",{for:"tren"},"Tren",-1))]),a("div",qe,[l(e(b),{modelValue:e(n).tipo_envio,"onUpdate:modelValue":t[5]||(t[5]=o=>e(n).tipo_envio=o),inputId:"carretera",name:"tipo_envio",value:"carretera"},null,8,["modelValue"]),t[21]||(t[21]=a("label",{for:"carretera"},"Carretera",-1))]),a("div",Ke,[l(e(b),{modelValue:e(n).tipo_envio,"onUpdate:modelValue":t[6]||(t[6]=o=>e(n).tipo_envio=o),inputId:"multimodal",name:"tipo_envio",value:"multimodal"},null,8,["modelValue"]),t[22]||(t[22]=a("label",{for:"multimodal"},"Multimodal",-1))])])]),a("div",null,[l(f,{for:"tipo_carga",value:"Tipo de Carga"}),a("div",Le,[a("div",Be,[l(e(b),{modelValue:e(n).tipo_carga,"onUpdate:modelValue":t[7]||(t[7]=o=>e(n).tipo_carga=o),inputId:"contenedor",name:"tipo_carga",value:"contenedor"},null,8,["modelValue"]),t[23]||(t[23]=a("label",{for:"contenedor"},"Contenedor",-1))]),a("div",Ge,[l(e(b),{modelValue:e(n).tipo_carga,"onUpdate:modelValue":t[8]||(t[8]=o=>e(n).tipo_carga=o),inputId:"granel",name:"tipo_carga",value:"granel"},null,8,["modelValue"]),t[24]||(t[24]=a("label",{for:"granel"},"Granel",-1))]),a("div",Re,[l(e(b),{modelValue:e(n).tipo_carga,"onUpdate:modelValue":t[9]||(t[9]=o=>e(n).tipo_carga=o),inputId:"paquetería",name:"tipo_carga",value:"paquetería"},null,8,["modelValue"]),t[25]||(t[25]=a("label",{for:"paquetería"},"Paquetería",-1))]),a("div",He,[l(e(b),{modelValue:e(n).tipo_carga,"onUpdate:modelValue":t[10]||(t[10]=o=>e(n).tipo_carga=o),inputId:"otro",name:"tipo_carga",value:"otro"},null,8,["modelValue"]),t[26]||(t[26]=a("label",{for:"otro"},"Otro",-1))])])]),a("div",null,[l(f,{for:"origen",value:"País de Origen"}),l(e(O),{id:"origen",modelValue:e(n).origen,"onUpdate:modelValue":t[11]||(t[11]=o=>e(n).origen=o),options:e(_),optionLabel:"label",optionValue:"value",placeholder:"Selecciona un país",class:"w-full",loading:e(z),invalid:!!e(n).errors.origen,filter:""},null,8,["modelValue","options","loading","invalid"]),l(V,{class:"mt-2",message:e(n).errors.origen},null,8,["message"])]),a("div",null,[l(f,{for:"destino",value:"País de Destino"}),l(e(O),{id:"destino",modelValue:e(n).destino,"onUpdate:modelValue":t[12]||(t[12]=o=>e(n).destino=o),options:e(_),optionLabel:"label",optionValue:"value",placeholder:"Selecciona un país",class:"w-full",loading:e(z),invalid:!!e(n).errors.destino,filter:""},null,8,["modelValue","options","loading","invalid"]),l(V,{class:"mt-2",message:e(n).errors.destino},null,8,["message"])]),a("div",null,[l(f,{for:"descripcion_carga",value:"Descripción"}),l(e(F),{id:"descripcion_carga",modelValue:e(n).descripcion_carga,"onUpdate:modelValue":t[13]||(t[13]=o=>e(n).descripcion_carga=o),class:"w-full",rows:"4",placeholder:"Agrega una descripción de la carga (opcional)",invalid:!!e(n).errors.descripcion_carga},null,8,["modelValue","invalid"]),l(V,{class:"mt-2",message:e(n).errors.descripcion_carga},null,8,["message"])]),a("div",null,[l(f,{for:"estado",value:"Estado de la Carga"}),l(e(se),{id:"estado",modelValue:e(n).estado,"onUpdate:modelValue":t[14]||(t[14]=o=>e(n).estado=o),placeholder:"Seleccionar estado",options:[{label:"Pendiente",value:"pendiente"},{label:"En proceso",value:"en_proceso"},{label:"Completada",value:"completada"},{label:"Cancelada",value:"cancelada"}],optionLabel:"label",optionValue:"value",class:"w-full",invalid:!!e(n).errors.estado},null,8,["modelValue","invalid"]),l(V,{class:"mt-2",message:e(n).errors.estado},null,8,["message"])]),v.value.length>0?(d(),s("div",Je,[l(f,{value:"Documentos Actuales",class:"mb-2"}),a("div",Qe,[(d(!0),s(E,null,I(v.value,o=>(d(),s("div",{key:o.id,class:"flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"},[a("div",We,[a("a",{href:`/storage/${o.path}`,target:"_blank",class:"flex items-center gap-2 text-blue-600 hover:underline"},[t[27]||(t[27]=a("i",{class:"pi pi-file-pdf text-xl text-red-500"},null,-1)),a("span",null,x(o.path.split("/").pop()),1)],8,Xe),D((d(),s("a",{href:`/storage/${o.path}`,target:"_blank",download:""},[l(e($),{icon:"pi pi-download",text:"",rounded:"",severity:"secondary"})],8,Ye)),[[w,"Descargar archivo",void 0,{top:!0}]]),D(l(e($),{icon:"pi pi-trash",text:"",rounded:"",severity:"danger",onClick:dt=>H(o.id)},null,8,["onClick"]),[[w,"Marcar para eliminar",void 0,{top:!0}]])])]))),128))])])):y("",!0),a("div",null,[l(f,{value:"Añadir Nuevos Documentos",class:"mb-2"}),l(e(me),{name:"nuevos_documentos[]",multiple:!0,accept:"application/pdf,image/*",maxFileSize:2e6,customUpload:!0,onSelect:B,onRemove:G,onClear:R,invalidFileSizeMessage:"El tamaño máximo permitido para cada archivo es de 2MB.",invalidFileTypeMessage:"Solo se permiten archivos PDF, JPG y PNG."},{empty:g(()=>[...t[28]||(t[28]=[a("p",null,"Arrastra y suelta archivos aquí para subirlos.",-1)])]),_:1}),l(V,{class:"mt-2",message:e(n).errors.nuevos_documentos},null,8,["message"])])]),a("div",Ze,[l(e($),{type:"submit",label:"Actualizar Exportación",loading:e(n).processing,icon:"pi pi-check",severity:"success"},null,8,["loading"])])],32)]),i.exportacion.bitacoras&&i.exportacion.bitacoras.length>0?(d(),s("div",et,[t[29]||(t[29]=a("h3",{class:"text-2xl font-bold text-gray-900 mb-6"},"Historial de Cambios",-1)),l(e(j),{value:i.exportacion.bitacoras,align:"alternate",class:"customized-timeline"},{marker:g(o=>[a("span",{class:ne(["flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm",{"bg-green-500":o.item.estado_nuevo==="completada","bg-blue-500":o.item.estado_nuevo==="en_proceso","bg-yellow-500":o.item.estado_nuevo==="pendiente","bg-red-500":o.item.estado_nuevo==="cancelada"}])},[o.item.estado_nuevo==="completada"?(d(),s("i",tt)):o.item.estado_nuevo==="en_proceso"?(d(),s("i",nt)):o.item.estado_nuevo==="pendiente"?(d(),s("i",it)):o.item.estado_nuevo==="cancelada"?(d(),s("i",at)):y("",!0)],2)]),content:g(o=>[l(e(q),{class:"mt-0 mb-5"},{title:g(()=>[a("span",ot,x(o.item.estado_nuevo.replace("_"," ")),1)]),subtitle:g(()=>[P(x(new Date(o.item.created_at).toLocaleString())+" por "+x(o.item.user.name),1)]),content:g(()=>[a("p",null,x(o.item.nota),1)]),_:2},1024)]),_:1},8,["value"])])):y("",!0)]),l(e(ce),{visible:k.value,"onUpdate:visible":t[16]||(t[16]=o=>k.value=o),modal:"",header:"Cambio de Estado",style:{width:"25rem"}},{footer:g(()=>[l(e($),{label:"Cancelar",severity:"secondary",onClick:L}),l(e($),{label:"Guardar Nota",severity:"success",onClick:K,disabled:!e(n).bitacora_nota},null,8,["disabled"])]),default:g(()=>[a("div",lt,[a("p",null,[t[30]||(t[30]=P(" Has cambiado el estado de ",-1)),a("span",rt,x(T.value?.replace("_"," ")),1),t[31]||(t[31]=P(" a ",-1)),a("span",st,x(e(n).estado?.replace("_"," ")),1),t[32]||(t[32]=P(". Por favor, agrega una nota para registrar este cambio en la bitácora. ",-1))]),l(e(F),{modelValue:e(n).bitacora_nota,"onUpdate:modelValue":t[15]||(t[15]=o=>e(n).bitacora_nota=o),rows:"5",cols:"30",placeholder:"Escribe tu nota aquí...",class:"w-full"},null,8,["modelValue"])])]),_:1},8,["visible"])]),_:1})],64)}}};export{gt as default};
