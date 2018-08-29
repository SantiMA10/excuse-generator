import * as functions from 'firebase-functions'

import { dialogflow } from 'actions-on-google'
import * as i18n from '@sfeir/actions-on-google-i18n'

const app = dialogflow({ debug: true });
i18n
    .configure({
        directory: `${__dirname}/../locales`,
        defaultLocale: 'en-US'
    })
    .use(app);

app.intent('excuse-generator', (conv: any) => {
    conv.ask(`${conv.__('INITIALS')} ${conv.__('EXCUSES')}. ${conv.__('FINALS')}`);
});

export const generateExcuse = functions.https.onRequest(app);
