import dotenv from 'dotenv';
import { assert } from 'chai';
import { fileFromSync } from 'fetch-blob/from.js';
import fetch from 'node-fetch';
import { FormData } from 'formdata-polyfill/esm.min.js';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

dotenv.config();

const fetchHtml = async (url) => {
  const res = await fetch(url);
  const html = await res.text();

  return html;
};

describe('SUBTASKS 1.1', async () => {
  let url = 'http://localhost:8080/';

  const codeAllyPort = process.env.CODEALLY_PORT_8080;
  if (codeAllyPort) url = codeAllyPort.replace('silisky.com', 'codeally.io');

  it(':1 You can submit a form that includes a file upload.', async () => {
    try {
      const dom = new JSDOM(await fetchHtml(url));
      const document = dom.window.document;

      assert(document.querySelector('input[type="file"]'));
    } catch (error) {
      assert(false);
    }
  });

  it(':1 The form file input field has the `name` attribute set to `upfile`.', async () => {
    try {
      const dom = new JSDOM(await fetchHtml(url));
      const document = dom.window.document;
      
      assert(document.querySelector('input[name="upfile"]'));
    } catch (error) {
      assert(false);
    }
  });

  it(':1 When you submit a file, you receive the file `name`, `type`, and `size` in bytes within the JSON response.', async () => {
    try {
      const form = new FormData();
      const file = fileFromSync('./test/01d.png', 'image/png');

      form.append('upfile', file, 'icon');

      const data = await fetch(`${url}api/fileanalyse`, {
        method: 'POST',
        body: form
      });
      const parsed = await data.json();

      assert.property(parsed, 'size');
      assert.equal(parsed.name, 'icon');
      assert.equal(parsed.type, 'image/png');
    } catch (error) {
      assert(false);
    }
  });
});
