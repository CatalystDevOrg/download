fetch('https://api.github.com/repos/jaydendev/catalyst/releases/latest')
    .then(res => res.json())
    .then(res => {
        const version = document.getElementById('version-title');
        version.innerText = res.name;
        version.href = res.html_url;

        const desc = document.getElementById('desc');
        desc.innerHTML = marked.parse(res.body);

        res.assets.forEach(asset => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = asset.browser_download_url;
            a.innerText = asset.name;
            a.className = 'text-2xl text-white';
            li.appendChild(a);
            document.getElementById('downloads').appendChild(li);
        });
    });