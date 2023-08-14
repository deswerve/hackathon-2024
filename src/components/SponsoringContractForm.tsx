import React, {ChangeEvent, Dispatch, FC, SetStateAction, useId, useState} from 'react';
import './SponsoringContactForm.scss';

type HandleChangeType = (setter: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) =>
        void;
const handleChange: HandleChangeType = (setter) =>
    (event) =>
        setter(event.target.value);

type SponsoringContractFormProps = { onShowResultPage: (e: boolean) => void };
export const SponsoringContractForm: FC<SponsoringContractFormProps> = ({onShowResultPage}) => {
    const emailAddressId = useId();
    const contactPersonFullNameId = useId();
    const sponsoringLevelId = useId();
    const addressLinesId = useId();
    const honeypot1Id = useId();
    const honeypot2Id = useId();
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [contactPersonFullName, setContactPersonFullName] = useState<string>('');
    const [sponsoringLevel, setSponsoringLevel] = useState<string>('gold');
    const [address, setAddress] = useState<string>('');
    const [honeypot1, setHoneypot1] = useState<string>('');
    const [honeypot2, setHoneypot2] = useState<string>('');
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const handleSubmit = () => {
        const addressLines = address.split(/\n|\r\n?/);
        const messages = [];
        if (honeypot1 || honeypot2)
            messages.push('Tiefsinnig! Wir werden sehr angestrengt über Ihre Anmerkungen nachdenken.');
        if (!contactPersonFullName.match(/^[A-Z\x80-\xff][\x21-\xff]*( [A-Z\x80-\xff][\x21-\xff]*)+$/i))
            messages.push('Ein sehr interessanter Name, den Sie da haben. Wir melden uns vielleicht mal.');
        if (!emailAddress.match(/^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-z0-9-]+)+$/i))
            messages.push('Wenn wir es schaffen sollten, an diese Adresse eine E-Mail zu schicken, haben wir uns Firmenanteile verdient, oder?');
        if (addressLines.length < 2)
            messages.push('Wir wollten Sie an Ihrer Anschrift besuchen, aber wir laufen immer noch auf dem Postplatz im Kreis.');
        if (addressLines.length > 6)
            messages.push('Wir fragen uns, wie die Leute in Ihrer Firma morgens zur Arbeit finden. Wir haben die erste Zeile jetzt schon wieder vergessen.');
        //
        if (messages.length) {
            setResultMessage(messages.join('\n\n'));
            onShowResultPage(true);
        } else {
            fetch(
                'https://eoujoxzcnzrfkao.m.pipedream.net',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify({emailAddress, contactPersonFullName, sponsoringLevel, addressLines})
                }
            ).then(
                response => setResultMessage('Vielen Dank für Ihre Anfrage. Sie sollten in Kürze eine E-Mail von SignWell erhalten, in der Sie einen Link zur Online-Unterschrift finden.'),
                error => setResultMessage('Leider gab es ein technisches Problem. Wir bedauern sehr, dass es zu diesen Unannehmlichkeiten gekommen ist, bitte schreiben Sie uns an hackathon@digitale-oberlausitz.eu'),
            );
            setResultMessage('Ihre Anfrage wird bearbeitet...')
            onShowResultPage(true);
        }
    };
    return <>
        {resultMessage?.split(/\n+/g).map((p, i) => <p key={i}>{p}</p>)
        || [
            <h2>Sponsoring-Vertrag anfordern</h2>,
            <div className='SponsoringContractForm'>
                <div className='label'><label htmlFor={sponsoringLevelId}>Sponsoring-Paket</label></div>
                <div className='control'>
                    <select id={sponsoringLevelId} value={sponsoringLevel} onChange={handleChange(setSponsoringLevel)}>
                        <option value="gold">Gold</option>
                        <option value="silver">Silber</option>
                        <option value="bronze">Bronze</option>
                    </select>
                </div>
                <div className='label'><label htmlFor={contactPersonFullNameId}>Name Kontaktperson</label></div>
                <div className='control'>
                    <input id={contactPersonFullNameId} value={contactPersonFullName}
                           onChange={handleChange(setContactPersonFullName)} type="text"/>
                </div>
                <div className='label ziszoshyfgonpumkyn'><label htmlFor={honeypot1Id}>Lorem ipsum</label></div>
                <div className='control ziszoshyfgonpumkyn'>
                    <input tabIndex={6} id={honeypot1Id} value={honeypot1} onChange={handleChange(setHoneypot1)} type="text"/>
                </div>
                <div className='label'><label htmlFor={emailAddressId}>E-Mail-Adresse Kontaktperson</label></div>
                <div className='control'>
                    <input id={emailAddressId} value={emailAddress} onChange={handleChange(setEmailAddress)}
                           type="text"/>
                </div>
                <div className='label'><label htmlFor={addressLinesId}>Name und Anschrift Firma</label></div>
                <div className='control'>
                    <textarea rows={6} id={addressLinesId} value={address}
                              onChange={handleChange(setAddress)}/>
                </div>
                <div className='label ziszoshyfgonpumkyn'><label htmlFor={honeypot2Id}>Lorem ipsum dolor sit
                    amet</label></div>
                <div className='control ziszoshyfgonpumkyn'>
                    <textarea tabIndex={7} rows={8} id={honeypot2Id} value={honeypot2} onChange={handleChange(setHoneypot2)}/>
                </div>
                <div className='label'/>
                <div className='control'>
                    <button onClick={handleSubmit}>Absenden</button>
                </div>
            </div>,
            <p>Die in diesem Formular erfassten Daten werden von uns ausschließlich zum Zwecke der Erstellung eines
                Sponsoring-Vertrags erhoben und verarbeitet. An dieser Verarbeitung sind beteiligt: Pipedream, Inc.
                (San Francisco, CA, USA) für die Automatisierung der Vertragserstellung und Docsketch, LLC
                (DBA SignWell; Portland, OR, USA) zur papierlosen Signierung und den damit verbundenen E-Mail-Verkehr.
            </p>,
        ]
        }
    </>;
};
