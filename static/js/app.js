console.log('app.js loaded');
// The code in these files is from Dom's description in office hours.

function drawBargraph (sampleId) {
    console.log(`drawBargraph(${sampleId})`);

    // read in the data 
    d3.json("data/samples.json").then(data => {
        //console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);

        var result = resultArray[0];


        // use otu_ids as the labels for the bar chart
        var otu_ids = result.otu_ids;

        // use otu_labels as the hovertext for the chart
        var otu_labels = result.otu_labels;
    
        // use sample_values as the values for the barchart
        var sample_values = result.sample_values;

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
        
        var result = resultArray[0];
        
        // use otu_ids for the x-values
        var otu_ids = result.otu_ids;
       
        // use sample_values for the y-values
        var sample_values = result.sample_values;
        
        // use sample_values for the marker size
        // use otu_ids for the marker color
        // user otu_labels for the text values
        var otu_labels = result.otu_labels;
        
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
 
}

function showMetadata (sampleId) {
    console.log(`showMetadata(${sampleId})`);
    
    d3.json("data/samples.json").then(data => {
        var metadata = data.metadata;
        var result = metadata.filter(s => s.id == sampleId);
        console.log(result);
        var demographic = d3.select("#sample-metadata");
        demographic.html("");
        
        Object.entries(result[0]).forEach((o) => {
            demographic.append("h6").text(`${o[0]} :  ${o[1]}\n`);
        });
    });

}

function drawGauge(sampleId) {
    console.log(`drawGauge(${sampleId})`);
    
    var washFrequency = "";
    // read in the data
    d3.json("data/samples.json").then(data => {
        var metadata = data.metadata;
        var result = metadata.filter(s => s.id == sampleId);
        
        washFrequency = result[0]['wfreq'];
        //console.log(`washes: ${washFrequency}`);
        
        var data = [
            {
                domain: {x: [0,10], y: [0,10]},
                value: washFrequency,
                bar: { color: "black"},
                title: { text: `Frequency of Belly Button Washings for ${sampleId}`},
                type: "indicator",
                mode: "gauge+number",
                delta: { 
                    reference: 10,
                    increasing: {color: "rebeccapurple"}
                },
                gauge: {
                    axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
                    steps: [
                        {range: [0 , 2], color: "#0081A7"},
                        {range: [2 , 4], color: "#00AFB9"},
                        {range: [4 , 6], color: "#FDFCDC"},
                        {range: [6 , 8], color: "#FED97B"},
                        {range: [8 , 10], color: "#F07167"}
                    ]
                },
                
            }
        ];
    
        var layout = { 
            width: 600,
            height: 500,
            margin: {t: 0, b: 0}
        };
    
        Plotly.newPlot('gauge', data, layout);

    });

}

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    drawBargraph(newSampleId);
    drawBubblechart(newSampleId);
    showMetadata(newSampleId);
    drawGauge(newSampleId);

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

        drawGauge(id);


    });

}


initDashboard();