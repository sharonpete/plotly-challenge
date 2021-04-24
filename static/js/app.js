console.log('app.js loaded');
// The code in these files is from Dom's description in office hours.

function drawBargraph (sampleId) {
    console.log(`drawBargraph(${sampleId})`);

    // read in the data 
    d3.json("data/samples.json").then(data => {
        //console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        //console.log(resultArray);

        var result = resultArray[0];

        //console.log(result);

        // use otu_ids as the labels for the bar chart
        var otu_ids = result.otu_ids;
        //console.log(otu_ids);

        // use otu_labels as the hovertext for the chart
        var otu_labels = result.otu_labels;
        //console.log(otu_labels);
    
        // use sample_values as the values for the barchart
        var sample_values = result.sample_values;
        //console.log(sample_values);

        // .slice is used per the instructions display the top 10 OTUs for the individual
        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(); //TBD

        var barData = {
            x: sample_values.slice(0,10).reverse(), // tbd
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),  //tbd
            orientation: "h"
        }

        var barArray = [barData];
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);

    });

}

function drawBubblechart (sampleId) {
    console.log(`drawBubblechart(${sampleId})`);
    
    // read in the data
    d3.json("data/samples.json").then(data => {
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        console.log(resultArray);

        var result = resultArray[0];
        console.log(result);

        // use otu_ids for the x-values
        var otu_ids = result.otu_ids;
        console.log(otu_ids);

        // use sample_values for the y-values
        var sample_values = result.sample_values;
        console.log(sample_values);

        // use sample_values for the marker size
        

        // use otu_ids for the marker color

        // user otu_labels for the text values
        var otu_labels = result.otu_labels;
        console.log(otu_labels);

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                opacity: [1, 0.8, 0.6, 0.4],
                size: sample_values,  //marker_size
                sizeref: 1
                //sizemode: 'area'
            }
        };

        var bubbleData = [trace1];

        var bubbleLayout = {
            title: `Operational Taxonomic Units (OTU) for ${sampleId}`,
            showLegend: true,
            height: 600,
            width: 1200,
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    })
    

    //var sample_values 
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

        // Draw the graphs and the metadata
        drawBargraph(id);

        drawBubblechart(id);

        showMetadata(id);

        //drawgauge(id);


    });

}


initDashboard();