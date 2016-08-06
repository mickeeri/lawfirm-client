import JSZipUtils from 'jszip-utils';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

export const generateLetterTemplate = (client) => {
  console.log(client);

  const loadFile = (url, callback) => {
    JSZipUtils.getBinaryContent(url, callback);
  };

  const templateUrl = 'https://s3.eu-central-1.amazonaws.com/elasticbeanstalk-eu-central-1-624915526884/assets/templates/letter_template.docx';

  loadFile(templateUrl, (err, content) => {
    if (err) {
      throw err;
    }

    const doc = new Docxtemplater(content);

    // Set the templateVariables
    doc.setData({
      first_name: client.first_name,
      last_name: client.last_name,
      street: client.street ? client.street : 'Gatuadress',
      post_code: client.post_code ? client.post_code : 'Postnummer',
      city: client.city ? client.city : 'Ort',
      user_name: client.user.full_name,
    });

    // Apply them
    doc.render();
    // Output the document using Data-URI
    const out = doc.getZip().generate({ type: 'blob' });
    saveAs(out, `Brevmall_${client.last_name} ${client.first_name}.docx`);
  });
};
