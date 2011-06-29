(function() {

     $('#out').attr('width', window.innerWidth)
              .attr('height', window.innerHeight);

     $(window).resize(function() {
			  $('#out').attr('width', window.innerWidth)
			      .attr('height', window.innerHeight);
			  visualization.render();
		      });

     var left = (window.innerWidth / 2) - 150;
     $('#modal').css('left', left)
                .hover(function() {
			   if ($('#modal').data('hidden')) {
			       $('#modal').animate({top:'0'});
			   }
		       },
		      function() {
			   if ($('#modal').data('hidden')) {
			       $('#modal').animate({top:'-60'});
			   }
		      });

     var $form = $('#csv_upload');
     $form.submit(function() {
		      console.log('submit');
		      $.ajaxFileUpload({
					   url: $form.attr('action'),
					   fileElementId: 'csv',
					   dataType: 'json',
					   success: function(data, status) {
					       //console.log('res', data);
					       if (!data.error) {
						   visualization.data = data;
						   visualization.render();
						   $('#modal').data('hidden', true)
						       .animate({top:'-60'});
					       } 
					   }
				       });
		      return false;
		  });

})();

var color = {

    rgbToHex: function(r, g, b) {
	return '#' + color.byteToHex(r) + color.byteToHex(g) + color.byteToHex(b);
    },

    byteToHex: function(n) {
	var nybHexString = "0123456789ABCDEF";
	return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
    },

    wave: function(i) {
	var frequency = .5;
	var amplitude = 129;
	var center = 128;
	var r = Math.sin(frequency*i + (4*Math.PI/3)) * amplitude + center;
	var g = Math.sin(frequency*i + (2*Math.PI/3)) * amplitude + center;
	var b = Math.sin(frequency*i + 0) * amplitude + center;
	var out_color = color.rgbToHex(r,g,b);
	return out_color;
    }
    
};

var visualization = {

    ctx: $('#out')[0].getContext('2d'),

    data: [],

    render: function() {

	// Only render if we have data to work with
	if (visualization.data.length == 0) return;

	var data_len = visualization.data.length;
	var column_width = window.innerWidth / (data_len - 2);

	// skip title row
	for(var i = 1; i < data_len; i++) {

	    var row = visualization.data[i];

	    // Handle bad data, newline at end of file
	    if (row.length > 1) {

		console.log('------------------------------------');

		var column = row[0];
		var column_opacity = row[1];

		var y = 0; // y increments with each box
		for(var j = 2, row_len = row.length; j < row_len; j++) {

		    var box = row[j];
		    var height = box * window.innerHeight;
		    var x = (i - 1) * column_width;

		    if (i < 4) {
			console.log('x', x, 'y', y, 'width', column_width, 'height', height, 'box', box);
		    }
		    var rect_color = color.wave(j + 5);
		    visualization.ctx.fillStyle = rect_color;
		    visualization.ctx.fillRect(x, y, column_width, height);

		    y += height;

		}

	    }

	}

    }

};
