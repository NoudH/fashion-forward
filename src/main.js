import { createApp } from 'vue'
import App from './App.vue'
import './axios.config';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/arya-orange/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import ConfirmDialog from 'primevue/confirmdialog';
import DataView from "primevue/dataview";
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Image from "primevue/image";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputSwitch from 'primevue/inputswitch';
import InputText from "primevue/inputtext";
import OverlayPanel from 'primevue/overlaypanel';
import Panel from 'primevue/panel';
import ProgressSpinner from 'primevue/progressspinner';
import ScrollPanel from 'primevue/scrollpanel';
import Toast from 'primevue/toast';
import Toolbar from 'primevue/toolbar';

const app = createApp(App);

app.use(PrimeVue, {ripple: true});
app.use(ConfirmationService);
app.use(ToastService);

app.component("Accordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("Button", Button);
app.component("Card", Card);
app.component("Carousel", Carousel);
app.component("ConfirmDialog", ConfirmDialog);
app.component("DataView", DataView);
app.component("Dialog", Dialog);
app.component("Dropdown", Dropdown);
app.component("FileUpload", FileUpload);
app.component("Image", Image);
app.component("InputMask", InputMask);
app.component("InputNumber", InputNumber);
app.component("InputSwitch", InputSwitch);
app.component("InputText", InputText);
app.component("OverlayPanel", OverlayPanel);
app.component("Panel", Panel);
app.component("ProgressSpinner", ProgressSpinner);
app.component("ScrollPanel", ScrollPanel);
app.component("Toast", Toast);
app.component("Toolbar", Toolbar);

app.mount('#app');