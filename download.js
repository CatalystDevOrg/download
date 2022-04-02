if (navigator.userAgent.indexOf("Windows") != -1) {
    os = "windows";
} else if (navigator.userAgent.indexOf("Mac") != -1) {
    os = "mac";
} else if (navigator.userAgent.indexOf("Linux") != -1) {
    os = "linux";
}

fetch('https://api.github.com/repos/jaydendev/catalyst/releases/latest')
    .then(res => res.json())
    .then(res => {
        const version = document.getElementById('version-title');
        version.innerText = res.name;
        version.href = res.html_url;

        const desc = document.getElementById('desc');
        desc.innerHTML = marked.parse(res.body);

        res.assets.forEach(asset => {
            if (os == "windows" && asset.name.indexOf("exe") == -1) {
                return;
            } else {
                if (os == "linux" && asset.name.indexOf(".deb") == -1 && asset.name.indexOf(".rpm") == -1) {
                    return;
                } else {
                    if (os == "mac" && asset.name.indexOf(".dmg") == -1) {
                        return;
                    }
                }
            }
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = asset.browser_download_url;
            a.innerText = "Download for " + os;
            a.className = 'animate-pulse center grid place-items-center rounded-lg hover:bg-emerald-300 bg-emerald-400 text-5xl text-white p-2';
            li.appendChild(a);
            document.getElementById('downloads').appendChild(li);
        });
    });