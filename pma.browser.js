function PMA(brandId, redirect_to, sandbox) {
    var domain = 'www.provemyage.com';
    if(sandbox === true) domain = domain.replace('www', 'sandbox');

    var backgroundUrl = '/token/background/?bid=' + brandId + '&redirect_to=' + (redirect_to || window.location);
    var cameraUrl = '/token/?bid=' + brandId + '&redirect_to=' + (redirect_to || window.location) + '&type=camera';
    var embedUrl = '/embed/?bid=' + brandId + '&redirect_to=' + (redirect_to || window.location);
    var yotiUrl = '/token/?bid=' + brandId + '&redirect_to=' + (redirect_to || window.location) + '&type=yoti';
    var iframeCount = 0;


    function createIframe(src, allow, width, height) {
        var iframe = document.createElement('iframe');
        allow && iframe.setAttribute('allow', allow);
        iframe.setAttribute('width', width || 1024);
        iframe.setAttribute('height', height || 768);
        iframe.setAttribute('src', 'https://' + domain + src);
        iframe.id = 'pmaIframe' + iframeCount;
        iframeCount++;
        return iframe;
    }

    this.listen = function(callback) {
        window.addEventListener('message', function(msg){
            if(message.origin !== window.location.origin) {
                var data = JSON.parse(message.data);
                data.status && callback( data.status == 200 ? null : data.status, data.message)
            }    
        });
        document.body.appendChild(createIframe(backgroundUrl, width, height));
    };

    this.optionsView = function(elm, width, height) {
        if(elm) elm.appendChild(createIframe(embedUrl, 'camera;', width, height));
        else window.location = yotiUrl;
    };

    this.cameraView = function(elm, width, height) {
        if(elm) elm.appendChild(createIframe(cameraUrl, 'camera;', width, height));
        else window.location = yotiUrl;
    };

    this.yotiView = function(elm, width, height) {
        if(elm) elm.appendChild(createIframe(yotiUrl, null, width, height));
        else window.location = yotiUrl;
    };
};