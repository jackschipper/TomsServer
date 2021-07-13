
var tableSizeRegex = /[1-9]/
var nameRegex = /([a-zA-Z]+['])?([a-zA-Z]+)?[,]?[ ]?([a-zA-Z]+['])?([a-zA-Z]+[-])?([a-zA-z]+)[ ]?([a-zA-Z]+)?([a-zA-Z])?[.]?/
var timeRegex = /([1]?[0-9]:[1-5][0-9])/
var dateRegex = /([0-9][0-9])[\/\-]([0-3][0-9])[\/\-]([1-9][0-9][0-9][0-9])/



$(window).on('load',function() {
       $("#delete").click(function () {

        var svgid = $('#delete').attr('d-id');
        $('#'+svgid).remove();
        $('#delete').removeAttr('d-id');    
        //$('#delete').attr('d-deleteMe', 'deleteme');        
        $("#contextmenu").hide();
        //svg.removeEventListener('contextmenu', $('#Delete'));
    
       
    });

    $("#add2").click(function () { 
        // figure this out
       
    })
    $("#green").click(function () { 
        var svgid = $('#green').attr('d-id');
        $("#"+svgid).css("background-color", "lightgreen");
        $('#green').removeAttr('d-id');  

    })
    $("#red").click(function () { 
        var svgid = $('#red').attr('d-id');
        $("#"+svgid).css("background-color", "lightcoral");
        $('#red').removeAttr('d-id');  
    })
    $("#default").click(function () { 
        var svgid = $('#default').attr('d-id');
        $("#"+svgid).css("background-color", "lightgreen");
        var table = document.getElementById(svgid);
        table.name = null;
        table.numPeople = null;
        table.time = null;
        table.date = null;
        $('#default').removeAttr('d-id');
        $('#default').removeAttr('name');
        $('#default').removeAttr('time');
        $('#default').removeAttr('date');
        $('#default').removeAttr('numPeople');

       
    })

    $("#reserve").click(function () {
        
        var numPeopleBool = false;
        var nameBool = false;
        var timeBool = false;
        var dateBool = false;
        var svgid = $('#reserve').attr('d-id');
     
        var svgsize = $('#reserve').attr('d-size');
        while (numPeopleBool == false) {
            var numPeople = window.prompt("How many people in your reservation (2 Top)?");
            if (numPeople == null) {
                alert("exiting...");
                return;
            }
            if (numPeople > svgsize) {
                alert("This table is a " + svgsize + " top, please enter a smaller value appropriate to the table size");
                continue;
            }
            else if (tableSizeRegex.test(numPeople)) {
                numPeopleBool = true;
                break;
            }
            else {
                alert("Invalid input, please try again, remember no letters");
            }
        }
        while (nameBool == false) {
            var name = window.prompt("What is the name on your reservation?");
            if (name == null) {
                alert("exiting...");
                return;
            }
            if (nameRegex.test(name)) {
                nameBool = true;
                break;
            }
            else {
                alert("Invalid input, please try again, remember no numbers");
            }
        }
        while (timeBool == false) {
            var time = window.prompt("What time would you like?");
            if (time == null) {
                alert("exiting...");
                return;
            }
            if (timeRegex.test(time)) {
                timeBool = true;
                break;
            }
            else {
                alert("Invalid input, please try again, enter a valid time with format 00:00");
            }
        }
        while (dateBool == false) {
            var date = window.prompt("On what date would you like to reserve this table? (MM/DD/YYYY)");
            if (date == null) {
                alert("exiting...");
                return;
            }
            if (dateRegex.test(date)) {
                dateBool = true;
                break;
            }
            else {
                alert("Invalid input, please try again, remember enter format MM/DD/YYYY");
            }

        }
        var table = document.getElementById(svgid);
        table.numPeople = numPeople;
        table.name = name; // ADD TIME AND DATE TOO
        table.time = time;
        table.date = date;

        $("#"+svgid).css("background-color", "lightcoral");
        $('#reserve').removeAttr('d-id');  
        $('#reserve').removeAttr('d-size');
    })

    $("#detail").click(function () {
        var svgid = $('#detail').attr('d-id');
        var table = document.getElementById(svgid);
        alert("Table ID: " + svgid + "\nTable Name: " + table.name + "\nTable Party Size: " + table.numPeople + "\nTable Time: " + table.time + " est 90 minutes" + "\nTable Date: " + table.date);
        $('#detail').removeAttr('d-id');  
    })


    $("#rotate").click(function() {
        
        console.log("rotating");
        var svgid = $('#rotate').attr('d-id');
        var deg = window.prompt("Enter amount of degrees to rotate table: ");
        $("#"+svgid).css("transform", "rotate(" + deg + "deg)");
        
        
        $('#rotate').removeAttr('d-id');  

    })
    
    document.addEventListener("click", function () {
        $("#contextmenu").hide();
    })
});

class SVGimg  {

    
    constructor() {
        console.log("In svgImg constructor");
        this.IDcounter = 0;
        this.selectedElement;
        this.svgList = []
    }

    
    draw2Top(doc) {  
        this.doc = doc;
       // this.newDiv = document.createElement("div");
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgNS = this.svg.namespaceURI;
        console.log("In SVGImg draw 2 top function");
       // this.newDiv.setAttribute("class", "draggable")
        this.svg.setAttribute("class", "draggable");
        this.svg.id = this.IDcounter;
        if (this.IDcounter != 0) {  
            var temp = this.svgList[this.svgList.length-1];
            var tempNumL = parseInt(temp.style.left);
            var tempNumT = parseInt(temp.style.top);
            tempNumL = tempNumL + 45; tempNumT = tempNumT + 45;
            this.svg.style.left = tempNumL;
            this.svg.style.top = tempNumT;
        }
        this.svg.size = 2;
        this.IDcounter = this.IDcounter + 1;
        var numID = this.IDcounter.toString();
        console.log("counter: ", this.IDcounter); 
       // this.newDiv.appendChild(this.svg);
        doc.appendChild(this.svg);
        
        this.svgList.push(this.svg);
        this.makeDraggable();
        return;
    }

    drawBarStool(c) {  
        this.c = c
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgNS = this.svg.namespaceURI;
        console.log("In SVGImg draw bar stool function");
        var square = document.createElementNS(this.svgNS, 'rect');
        square.setAttribute("class", "draggable");
        square.setAttribute("width", "10");
        square.setAttribute("height", "10");
        square.setAttribute("fill", "black");
        var numID = this.IDcounter.toString(); //give each element their own custom ID
        console.log("counter: ", this.IDcounter);
        square.setAttribute("id", numID);
        this.svg.appendChild(square);
        c.appendChild(this.svg);
        this.square = square;  
        this.id = "mySVG"+this.IDcounter;
        this.IDcounter = this.IDcounter + 1;
        this.makeDraggable();
    }

    draw4Top(c) {
        this.c = c;
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgNS = this.svg.namespaceURI;
        console.log("In SVGImg draw function");
        var square = document.createElementNS(this.svgNS, 'rect');
       
        
        square.setAttribute("class", "draggable");
        square.setAttribute("width", "10");
        square.setAttribute("height", "10");
     
        square.setAttribute("fill", "black");
        var numID = this.IDcounter.toString();
        console.log("counter: ", this.IDcounter);
        square.setAttribute("id", numID);
      
        this.svg.appendChild(square);

        c.appendChild(this.svg);
        this.id = "mySVG"+this.IDcounter;
        this.square = square;  
        this.IDcounter = this.IDcounter + 1;
        this.makeDraggable();
    }

    draw6Top(c) {  
        this.c = c;
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgNS = this.svg.namespaceURI;
        console.log("In SVGImg draw function");


    
        var square = document.createElementNS(this.svgNS, 'rect');
        square.setAttribute("class", "draggable");
        square.setAttribute("width", "10");
        square.setAttribute("height", "10");
        square.setAttribute("fill", "black");
        var numID = this.IDcounter.toString();
        console.log("counter: ", this.IDcounter);
        square.setAttribute("id", numID);
        this.svg.appendChild(square);

    
        c.appendChild(this.svg);
        this.id = "mySVG"+this.IDcounter;  
        this.square = square;  
        this.IDcounter = this.IDcounter + 1;
        this.makeDraggable();
    }



    makeDraggable() {

        console.log("in SVGimg makeDraggable function");
        
        var svg = this.svg;
        var svgList = this.svgList;

       
        svg.addEventListener('mousedown', startDrag);
        
        svg.addEventListener('mouseup',  endDrag);
        svg.addEventListener('mouseleave', endDrag);
        svg.addEventListener('touchstart', startDrag);
        
        svg.addEventListener('touchend', endDrag);
        svg.addEventListener('touchleave', endDrag);
        svg.addEventListener('touchcancel', endDrag);
        
       
        svg.addEventListener('contextmenu', function(event) {
            $("#contextmenu").css({"top": event.pageY + "px", "left": event.pageX + "px"}).show();
            event.preventDefault(), svg;
            console.log(svg.id);
            $('#delete').removeAttr('d-id');
            $('#delete').attr('d-id',svg.id);

            $('#add2').removeAttr('d-id');
            $('#add2').attr('d-id',svg.id);
            $('#add2').removeAttr('d-id1');
            $('#add2').attr('d-id1', this.newDiv);

            $('#rotate').removeAttr('d-id');
            $('#rotate').attr('d-id',svg.id);

            $('#green').removeAttr('d-id');
            $('#green').attr('d-id',svg.id);

            $('#red').removeAttr('d-id');
            $('#red').attr('d-id',svg.id);

            $('#default').removeAttr('d-id');
            $('#default').attr('d-id',svg.id);

            $('#reserve').removeAttr('d-id');
            $('#reserve').attr('d-size',svg.size);
            $('#reserve').removeAttr('d-id');
            $('#reserve').attr('d-id',svg.id);

            $('#detail').removeAttr('d-id');
            $('#detail').attr('d-id',svg.id);
        });
 

        var offset, transform,
            bbox, minX, maxX, minY, maxY, confined;

        var boundaryX1 = 10.5;
        var boundaryX2 = 30;
        var boundaryY1 = 2.2;
        var boundaryY2 = 19.2;

        function getMousePosition(evt) { //really only used now to calculate the offset
            var CTM = svg.getScreenCTM();
            if (evt.touches) { evt = evt.touches[0]; }
            return {
                x: (evt.clientX - CTM.e) / CTM.a,
                //x: $('#'+svg.id).position().left,
                y: (evt.clientY - CTM.f) / CTM.d
                //y: $('#'+svg.id).position().top
            };
        }
        

        function startDrag(evt) {
        
           console.log("in SVGimg startDrag function");
           console.log(svg.id);

            if (evt.target.classList.contains('draggable')) {
              //  console.log("IF statement passed in start drag");
                this.selectedElement = evt.target;
                offset = getMousePosition(evt);
                
                svg.addEventListener('mousemove', drag);
                svg.addEventListener('touchmove', drag);
            // Make sure the first transform on the element is a translate transform
           var transforms = this.selectedElement.transform.baseVal;

            if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
            var translate = svg.createSVGTransform();
            
           // translate.setTranslate(0, 0);
            this.selectedElement.transform.baseVal.insertItemBefore(translate, 0);
            console.log("in SVGimg addingEventListener function");
            
            }
           transform = transforms.getItem(0);
            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;

            confined = evt.target.classList.contains('confine');
            if (confined) {
              
                bbox = selectedElement.getBBox();
                minX = boundaryX1 - bbox.x;
                maxX = boundaryX2 - bbox.x - bbox.width;
                minY = boundaryY1 - bbox.y;
                maxY = boundaryY2 - bbox.y - bbox.height;
            }
        }
        }

        function drag(evt) {
      
            console.log("in SVGimg drag function");
            var coord = getMousePosition(evt);
            var dx = coord.x - offset.x;
            var dy = coord.y - offset.y;
            var px = evt.pageX;
            var py = evt.pageY;
  
            console.log(px,py);
            this.style.top = py - offset.y;
            this.style.left = px - offset.x
            
  
            //   if (this.selectedElement) {
            //       evt.preventDefault();
            //       var coord = getMousePosition(evt);
            //       var dx = coord.x - offset.x;
            //       var dy = coord.y - offset.y;
            //       if (confined) {
            //           if (dx < minX) { dx = minX; }
            //           else if (dx > maxX) { dx = maxX; }
            //           if (dy < minY) { dy = minY; }
            //           else if (dy > maxY) { dy = maxY; }
            //       }
            //     //  transform.setTranslate(dx, dy);
            //       //console.log("transform....", $('#'+svg.id).position())
            //       // $('#'+svg.id).css("left", dx);
            //       // $('#'+svg.id).css("top", dy);
            //      // $("#"+svg.id).css("transform", "translate(dx, dy)");
            //       this.dx = dx;
            //       this.dy = dy;
            //       console.log("this.dx", this.dx, "this.dy", this.dy)
            //       console.log("position", $('#'+svg.id).position());
            //       if (this.dx > 270 && this.dx < 445) {
            //           if (this.dy > -198 && this.dy < 23) {
            //               alert("CANNOT PLACE TABLE IN THIS AREA");
            //               this.dx = 20;
            //               this.dy = 20;
            //               transform.setTranslate(this.dx, this.dy);
            //               this.selectedElement = false;
            //           }
            //       }
            //   }        
          }
               
           


        function endDrag(evt) {

            console.log("in SVGimg endDrag function");
            console.log("Testing svgList: ", svgList.length);


            for (var i = 0; i < svgList.length; i++) {
            //     var del = $("#"+svgList[i].id).attr('d-deleteMe')
            //     if (del == 'deleteme') {
            //         var temp = svgList.indexOf(svgList[i]);
            //         svgList.splice(temp, 0);
            //    }
                if (svg.style.left != svgList[i].style.left && svg.style.top != svgList[i].style.top) { // has bug with deleted tables
                    var tempL = parseInt(svg.style.left) - parseInt(svgList[i].style.left);
                    console.log("left dist: ", tempL);
                    var tempT = parseInt(svg.style.top) - parseInt(svgList[i].style.top);
                    console.log("top dist: ", tempT);
                    if (tempL < 40 && tempL > - 40 && tempT < 40 && tempT > -40) {
                        alert("Cannot place table on another table");
                        svg.style.left = 600;
                        svg.style.top = 500
                    }
                }

            }
            // if ($('#'+svg.id).position().top > 335 && $('#'+svg.id).position().top < 968) {
            //     if ($('#'+svg.id).position().left > 665 && $('#'+svg.id).position().left < 841) {
            //         alert("Cannot place table on walls or structures");
            //         $('#'+svg.id).css('left', 430);
            //         $('#'+svg.id).css('top', 562);
            //     }
            // }

            svg.removeEventListener('mousemove', drag);
            svg.removeEventListener('touchmove', drag);

            this.selectedElement = false;
            
            
            
        }

        return;

    }
}

