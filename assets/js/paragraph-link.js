(() => {
    var addParagraphLinks = () => {
        var headlines = document.querySelectorAll('h1, h2, h3');

        var link = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
  <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
  <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
</svg>`;

        var url = window.location.protocol + '//' + window.location.hostname + (window.location.port? ":" + window.location.port : "") + window.location.pathname;

        headlines.forEach(hl => {
            if(hl.getAttribute('id') && hl.children.length === 0) {
                var a = document.createElement('a');

                a.setAttribute('href', url + "#" + hl.getAttribute('id'));
                a.innerHTML = link;

                a.classList.add('paragraph-link');

                a.addEventListener('click', e => {
                    e.preventDefault();
                    e.stopPropagation();

                    navigator.clipboard.writeText(a.getAttribute('href'));

                    a.classList.add('clicked');

                    window.setTimeout(() => {
                        a.classList.remove('clicked');
                    }, 300)
                })

                hl.prepend(a)
            }
        })
    }



    var currentHref = null;

    window.setInterval(() => {
        if(currentHref !== window.location.href) {
            addParagraphLinks();
            currentHref = window.location.href;
        }
    }, 100);
})();

