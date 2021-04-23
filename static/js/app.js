console.log('app.js loaded');
// The code in these files is from Dom's description in office hours.

function drawBargraph (sampleId) {
    console.log(`drawBargraph(${sampleId})`);


}

function drawBubblechart (sampleId) {
    console.log(`drawBubblechart(${sampleId})`);

}

function showMetadata (sampleId) {
    console.log(`showMetadata(${sampleId})`);
}

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    drawBargraph(newSampleId);
    drawBubblechart(newSampleId);
    showMetadata(newSampleId);

}


function initDashboard() {
    console.log("initDashboard()");

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(data => {
        console.log(data);

        var sampleNames = data.names;
        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        var id = sampleNames[0];

        drawBargraph(id);

        drawBubblechart(id);

        showMetadata(id);

        drawgauge(id);


    });


    // Update the bar graph
    

    // Update the bubblechart

    // Update the demographic information
}


initDashboard();