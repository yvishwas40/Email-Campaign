import { useState } from 'react';
import { Calendar, Clock, Settings } from 'lucide-react';

export function CampaignScheduler() {
  const [schedule, setSchedule] = useState({
    startDate: '',
    startTime: '',
    batchSize: 50,
    interval: 60, // minutes
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Scheduler</h2>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="startDate"
                  value={schedule.startDate}
                  onChange={(e) => setSchedule({ ...schedule, startDate: e.target.value })}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="startTime"
                  value={schedule.startTime}
                  onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="batchSize" className="block text-sm font-medium text-gray-700">
                Batch Size
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="batchSize"
                  value={schedule.batchSize}
                  onChange={(e) => setSchedule({ ...schedule, batchSize: parseInt(e.target.value) })}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Number of emails per batch"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Number of emails to send in each batch
              </p>
            </div>

            <div>
              <label htmlFor="interval" className="block text-sm font-medium text-gray-700">
                Interval (minutes)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="interval"
                  value={schedule.interval}
                  onChange={(e) => setSchedule({ ...schedule, interval: parseInt(e.target.value) })}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Minutes between batches"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Time to wait between sending each batch
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Schedule Campaign
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Settings className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Throttling Settings
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Current settings will send {schedule.batchSize} emails every {schedule.interval} minutes.
                  This means approximately {(schedule.batchSize * 60 / schedule.interval).toFixed(0)} emails per hour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}