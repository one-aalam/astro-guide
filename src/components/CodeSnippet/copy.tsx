import React from 'react'

function copyToClipboard(data: any): void {
	navigator.clipboard.writeText(String(data));
}

export function CopyToClipboard() {
    function onCopy(elm) {
        const code = elm.target.parentElement.parentElement.getElementsByTagName('code')[0]
        if(code) {
            copyToClipboard(code.innerText)
        }
    }
    return <button className="px-2 py-1 uppercase text-xs absolute top-0 right-0 text-gray-400 hover:text-gray-800" onClick={onCopy}>copy</button>
}
