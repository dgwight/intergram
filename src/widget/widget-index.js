import {h, render} from 'preact';
import Widget from './widget';
import {defaultConfiguration} from './default-configuration';

function intergram(intergramId) {
    let root = document.createElement('div');
    root.id = 'intergramRoot';
    document.getElementsByTagName('body')[0].appendChild(root);
    const server = window.intergramServer || 'https://www.intergram.xyz';
    const iFrameSrc = server + '/chat.html';
    const host = window.location.host || 'unknown-host';
    const conf = {...defaultConfiguration, ...window.intergramCustomizations};

    render(
        <Widget intergramId={intergramId}
                host={host}
                isMobile={window.screen.width < 500}
                iFrameSrc={iFrameSrc}
                conf={conf}
        />,
        root
    );

    try {
        const request = new XMLHttpRequest();
        request.open('POST', server + '/usage-start?host=' + host);
        request.send();
    } catch (e) { /* Fail silently */
    }
}

window.intergram = intergram;
