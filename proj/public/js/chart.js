
      
      var MyChart = {
        
        drawChart: function(div, data, options){
          console.log('div:'+div+'data:'+data+', options:'+options);
          google.charts.setOnLoadCallback(drawChart(data,options));
          function drawChart(data, options) {
            console.log('data:'+data+', options:'+options);
            

            var chart = new google.visualization.PieChart(div);
            
            function selectHandler() {
              var selectedItem = chart.getSelection()[0];
              if (selectedItem) {
                var item = data.getValue(selectedItem.row, 0);
                alert('The user selected ' + item);
              }
            }
    
            google.visualization.events.addListener(chart, 'select', selectHandler);  
            chart.draw(data, options);
          }
        }
      };
      