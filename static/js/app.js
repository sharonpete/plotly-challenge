console.log('app.js loaded');
// The code in these files is from Dom's description in office hours.




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
    });


    // Update the bar graph

    // Update the bubblechart

    // Update the demographic information
}


initDashboard();