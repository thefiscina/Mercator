function notifyParent(messageType, data) {
    parent.postMessage(JSON.stringify({ 'type': messageType, 'data': data }), '*');
}

function renderChart(config, apiUrl, publicApiUrl, dataCollectorUrl, localSettings) {
    var parsedConfig = new mercator.ConfigParser().parse(config);

    var chartCreated = _.partial(notifyParent, 'chartCreated');
    var chartUpdated = _.partial(notifyParent, 'chartUpdated');
    var chartPublished = _.partial(notifyParent, 'chartPublished');
    var chartRendered = _.partial(notifyParent, 'seatsioRendered');
    var designerRenderingFailed = _.partial(notifyParent, 'designerRenderingFailed');
    var statusChanged = _.partial(notifyParent, 'statusChanged');
    var onExitRequested = parsedConfig.showExitButton ? _.partial(notifyParent, 'exitRequested') : null;
    var onLocalSettingChanged = _.partial(notifyParent, 'localSettingChanged');
    var workspaceKey = parsedConfig.workspaceKey || parsedConfig.publicKey

    var chartDesigner = new mercator.ChartDesigner('drawing', parsedConfig.chartKey, parsedConfig.openDraftDrawing, parsedConfig.secretKey, parsedConfig.designerKey, workspaceKey, apiUrl, publicApiUrl, dataCollectorUrl, parsedConfig.baseColor, parsedConfig.features, parsedConfig.language, parsedConfig.mode, chartCreated, chartUpdated, chartPublished, statusChanged, onExitRequested, onLocalSettingChanged, parsedConfig.openLatestDrawing, localSettings, parsedConfig.canvasColorScheme);
    chartDesigner
        .render()
        .then(chartRendered)
        .fail(showRenderingError)
        .fail(designerRenderingFailed);
    return chartDesigner;
}

function initChartDesignerIframe() {
    window.addEventListener('message', function (message) {
        var data = JSON.parse(message.data);
        if (data.type == 'render') {
            window.mercatorMap = renderChart(data.configuration, data.apiUrl, data.publicApiUrl, data.dataCollectorUrl, data.localSettings);
        }
    });

    notifyParent('mercatorCharge');
}
