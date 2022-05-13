import React from 'react';
// import './App.css';
import {
	LineChart,
	ResponsiveContainer,
	Legend, Tooltip,
	Line,
	XAxis,
	YAxis,
	CartesianGrid
} from 'recharts';

// Sample chart data
const pdata = [
	{
		name: 'Jan',
		revenue: 11,
		
	},
	{
		name: 'Feb',
		revenue: 13,
	},
	{
		name: 'Mar',
		revenue: 14,
	},
	{
		name: 'Apr',
		revenue: 7,
	},
	{
		name: 'May',
		revenue: 34,
	},
	{
		name: 'Jun',
		revenue: 9,
	},
    
    {
		name: 'Jul',
		revenue: 12,
	},
    {
		name: 'Aug',
		revenue: 24,
	},
    {
		name: 'Sep',
		revenue: 10,
	},
    {
		name: 'Oct',
		revenue: 5,
	},
    {
		name: 'Nov',
		revenue: 21,
	},
    {
		name: 'Dec',
		revenue: 11,
	}
];

function LineGraph() {
	return (
		<>
			
			<ResponsiveContainer width="100%" height={250}>
				<LineChart data={pdata} margin={{left:-35, right:10}}>
					<CartesianGrid  stroke='#17202a20'/>
					<XAxis dataKey="name"
						interval={'preserveStartEnd'} />
					<YAxis></YAxis>
					<Legend />
					<Tooltip contentStyle={{ width:"120px", borderRadius:"5px", textAlign:"center"} } itemStyle={{textTransform:"capitalize"}} />
					<Line type="monotone" dataKey="revenue"
						stroke="#13B148" strokeWidth={2}  activeDot={{ r: 6 }} />
					
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}

export default LineGraph;
