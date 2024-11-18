import { useState } from 'react';
import { BarChart, Users, Mail, Clock, Edit } from 'lucide-react'; // Import Edit icon for email generator
import { CampaignStats } from './CampaignStats';
import { ContactsList } from './ContactsList';
import { EmailComposer } from './EmailComposer';
import { CampaignScheduler } from './CampaignScheduler';
import { EmailTracking } from './EmailTracking';
import { Progress } from './Progress';
import { EmailGeneratorForm } from './EmailGeneratorForm';  // Import Email Generator Form

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Mail className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Campaign Manager</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'stats'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart className="h-5 w-5 mr-2" />
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'contacts'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              Contacts
            </button>
            <button
              onClick={() => setActiveTab('compose')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'compose'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Mail className="h-5 w-5 mr-2" />
              Compose
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'schedule'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Clock className="h-5 w-5 mr-2" />
              Schedule
            </button>
            {/* Add new button for Email Generator */}
            <button
              onClick={() => setActiveTab('email-generator')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'email-generator'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Edit className="h-5 w-5 mr-2" />
              Email Generator
            </button>
          </div>

          <div className="bg-white rounded-lg shadow">
            {activeTab === 'stats' && (
              <>
                <CampaignStats />
                <EmailTracking />
                <Progress current={45} total={100} /> {/* Added progress bar */}
              </>
            )}
            {activeTab === 'contacts' && <ContactsList />}
            {activeTab === 'compose' && <EmailComposer />}
            {activeTab === 'schedule' && <CampaignScheduler />}
            {/* Add condition for Email Generator Form */}
            {activeTab === 'email-generator' && <EmailGeneratorForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
