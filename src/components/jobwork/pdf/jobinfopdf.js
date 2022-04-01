import ReactPDF from '@react-pdf/renderer';
import MyDocument from './mydocument';

ReactPDF.renderToStream(<MyDocument />);