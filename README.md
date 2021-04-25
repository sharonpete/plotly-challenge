# plot.ly-challenge
## Belly Button Biodiversity Dashboard
### Overview:

As touted by the website below, this was a study on Belly Button Biodiversity where they claim "The coolest study of biodiversity on the human body on the planet!" and then discuss the belly button as a *habitat*.

If you are so intrigued, there is an attached website <a href="http://robdunnlab.com/science-portfolio/bellybutton-portrait-series/?portfolioCats=38">Bellybutton Portrait Series </a>
<p><em>The Bellybutton Portrait Series is a set of photographs of microbial cultures of individuals that double as portraits of the subject’s microbial selves.</em></p>

Source of inspiration and data http://robdunnlab.com/projects/belly-button-biodiversity/

However, if you thought this was about navel-gazing, you would only be partially correct.  This homework was a study of the library known as <a href="https://plotly.com/javascript/">Plotly ... for JavaScript</a>  It also has a Python variant which will be studied another day.  Plotly is built on top of <a href="https://d3js.org/">d3.js</a> and <a href="https://github.com/stackgl">stack.gl</a>.  Plotly.js is a "high-level, declarative charting library and ships with over 40 chart types, including 3D charts, statistical graphs, and SVG maps."  Clearly, I have more work to do here.

### Instructions
Instructions are simple... 

- Select a participant from the dropdown
- Note the top 10 Bacteria Cultures found
- Note the cool bubble chart with the Operational Taxonomic Units (OTU) for said person
- Note the gauge with the frequency of belly button washings for same
- Repeat with a different participant!


### Technical Report:
**This homework was undertaken after participating in Dom's office hours and uses his professional approach which identified the 'Work Breakdown Structure' and his elegant code architecture.**  He also helped us with understanding the best approach to writing the bar graph.  I attempted to follow his pattern with the remainder of the graphs and displays.

After following his lead to get started, I then built the function drawBubbleChart.  This gave me an opportunity to play with the JavaScript filter to pull data for the selected sample ID.  I then built out the Plotly Bubble Chart using the OTU Ids as the x-values and the Sample values as the y-values.  I also used the sample values to determine the marker size, the OTR Ids to determine the marker color, and the OTU labels for the text values.  

The next function I tackled was the showMetaData function which displays all of the metadata that accompanies the selected sample ID.  This populated the box near the dropdown with information about the participant, including how frequently they wash their belly button!  (I really want to add a dad joke about having to use a linter for javascript here.)

Lastly, I tackled the bonus question and added a function to drawGauge, which shows the participants *reported* belly button scrubs per week.  This took a little more digging as it is one of the more complicated charts thus far, and is not one covered in lecture. The colors in the chart were pulled from <a href="https://coolors.co/palettes/trending">coolors</a>
