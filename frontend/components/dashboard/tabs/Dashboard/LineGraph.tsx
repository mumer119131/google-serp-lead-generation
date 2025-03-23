"use client"
import { useTheme } from '@/context/ThermeContext';
import { Lead } from '@/types/leads'
import React from 'react'
import { AxisOptions, Chart } from "react-charts";

interface LineGraphProps {
    leads: Lead[]
}

type DailyLeads = {
    date: Date,
    id: number,
}

const LineGraph = ({ leads }: LineGraphProps) => {
    const today = new Date();
    const {theme} = useTheme()
    const isDarkMode = theme === "dark"
    const lastWeekLeads = leads.filter(lead => {
        const leadDate = new Date(lead.crawled_at);
        return (today.getTime() - leadDate.getTime()) / (1000 * 3600 * 24) <= 7;
    });

    const labels = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
    }).reverse();

    const getLeadsByDate = (date: Date) => {
        return lastWeekLeads.filter(lead => {
            const leadDate = new Date(lead.crawled_at);
            return leadDate.toDateString() === date.toDateString();
        }).length;
    }

    const LastWeekLeadsInDayAndNumberOfLeads = labels.map(label => ({
        date: new Date(label),
        id: getLeadsByDate(new Date(label))
    }));

    const data = React.useMemo(
        () => [
            {
                label: 'Last Week Leads',
                data: LastWeekLeadsInDayAndNumberOfLeads
            }
        ],
        [LastWeekLeadsInDayAndNumberOfLeads]
    );

    const primaryAxis = React.useMemo(
        (): AxisOptions<DailyLeads> => ({
            getValue: datum => datum.date,
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        (): AxisOptions<DailyLeads>[] => [
            {
                getValue: datum => datum.id,
            },
        ],
        []
    );
    
    return (
        <div style={{ width: '100%', height: '300px' }}>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                    dark: isDarkMode,
                }}
            />
        </div>
    );
}

export default LineGraph;
