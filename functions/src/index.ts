import * as functions from 'firebase-functions'

import { dialogflow } from 'actions-on-google'
import * as i18n from '@sfeir/actions-on-google-i18n'

const app = dialogflow({ debug: true });
i18n
    .configure({
        directory: `${__dirname}/../locales`,
        defaultLocale: 'en-us'
    })
    .use(app);

app.intent('excuse-generator', (conv: any) => {
    conv.close(`${conv.__('INITIALS')} ${conv.__('EXCUSES')}.`);
});

export const generateExcuse = functions.https.onRequest(app);
