const socket = io(),
	options = {
		plotOptions: {
			series: {
				events: {
					legendItemClick: function(event) {
						event.preventDefault()
					}
				}
			}
		},
		chart: {
			backgroundColor: '',
			renderTo: 'graph',
			plotBorderColor: '#715ec9'
		},
		title: {
			text: ''
		},
		xAxis: {
			type: 'datetime',
			dateTimeLabelFormats: {
				day: '%a'
			}
		},
		yAxis: {
			title: {
				text: 'Requests Per Second',
				margin: 10
			}
		},
		credits: {
			enabled: false
		},
		series: [{
			type: 'area',
			name: 'Number of Requests',
			color: '#ffffff',
			data: []
		}]
	},
	chart = new Highcharts.Chart(options)
Highcharts.setOptions({
	lang: {
		loading: 'Loading...',
		months: ['January', 'February', 'Мarch', 'Аpril', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		shortMonths: ['Jan', 'Feb', 'March', 'Apr', 'Мay', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	}
})

function getStringCount(count) {
	if(count === 0) return '0'
	count = Math.floor(count)
	let i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000)),
		result = parseFloat((count / Math.pow(1000, i)).toFixed(2))
	if(i >= 17) return '∞'
	result += [' Thousand', ' Million', ' Billion', ' Trillion',][i]
	result = result.replace(/e/g, '')
	result = result.replace(/\+/g, '')
	result = result.replace(/Infinity/g, '∞')
	return result
}
socket.on('requests', (all_requests, per_requests, max_requests) => {
	chart.series[0].addPoint([new Date().getTime(), per_requests], true, chart.series[0].points.length > 60)
	document.getElementById('total_day_requests').innerHTML = getStringCount(all_requests)
	document.getElementById('max_requests').innerHTML = getStringCount(max_requests)
})
