(function () {
    //Variables - following single variable pattern
    var creativity_color = '#ffff00', //yellow
        communication_color = '#ff8000', //orange
        person_color = '#ff0000', //red
        thorough_color = '#8000ff', //purple
        analytic_color = '#0000ff', //blue
        system_color = '#00ff00', //green


        colorArr = [ creativity_color, communication_color, person_color, thorough_color, analytic_color, system_color ], //sample color data

        creativity_value = 21,
        communication_value = 0,
        person_value = 6,
        thorough_value = 15,
        analytic_value = 37,
        system_value = 21,
        pieData = [creativity_value, communication_value, person_value, thorough_value, analytic_value, system_value],

        startAngle = 270,
        endAngle = 270,
        sectorAngle = 0,
        total = 0,
        radius = 150,
        donutRadius = 0,
        cx = 200,
        cy = 200,
        animSpeed = 500,
        paper = Raphael('canvas'),
        path = null;


     //sample data


    //creates a custom attribute 'sector' for a Rapahel path
    paper.customAttributes.sector = function(cx, cy, r, startAngle, endAngle) {
        var rad = Math.PI / 180,
            x1 = cx + r * Math.cos(startAngle * rad),
            x2 = cx + r * Math.cos(endAngle * rad),
            y1 = cy + r * Math.sin(startAngle * rad),
            y2 = cy + r * Math.sin(endAngle * rad),
            flag = (Math.abs(endAngle - startAngle) > 180);

        return {
            path:[["M", cx, cy,],["L", x1, y1,],["A", r, r, 0, +flag, 1, x2, y2,],["z"]]
        };
    };


    //CALCULATE THE TOTAL
    for(var k=0; k < pieData.length; k++){
        total += pieData[k];
    }

    //CALCULATE THE ANGLES THAT EACH SECTOR SWIPES AND STORE IN AN ARRAY
    for(k=0; k < pieData.length; k++){
        sectorAngle = (360 * pieData[k]/total);   //calculate the sector angle for a pie slice

        startAngle = endAngle;  //the start angle for each pie slice
        endAngle = startAngle + sectorAngle;  //the end angle for each pie slice

        //create a rapahel path with the custom pie 'sector' attribute that we defined above. Start angle initially is 0
        path = paper.path().attr({sector:[cx, cy, radius, 0, 0], stroke:'#fff', "stroke-width":1, "stroke-linejoin" : "round","stroke-linecap" : "round", fill:colorArr[k]}).data("id", k).click(function() {
            alert(this.data("id")); //I have also added a click event for each slice. This is just in case you need to handle a pie slice click
        });

        //change the pie sector attribute over time - this is where the animation happens
        path.animate({sector:[cx, cy, radius, startAngle, endAngle]}, animSpeed, function() {
            console.log('callback function called after animation');
        });
    }

    //create the donut for the pie chart. If you don't need it then remove this part
    paper.circle(cx, cy, donutRadius).attr({"fill":"#fff", "stroke": "#fff"});
})();
