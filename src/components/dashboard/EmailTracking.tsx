export function EmailTracking() {
    const emailData = [
      {
        company: 'scripbox',
        email: 'help@scripbox.com',
        status: 'Sent',
        delivery: 'Delivered',
        opened: 'Yes',
      },
      {
        company: 'Quora',
        email: 'curiosity@quora.com',
        status: 'Scheduled',
        delivery: 'N/A',
        opened: 'N/A',
      },
      {
        company: 'OverLeaf',
        email: 'welcome@overleaf.com',
        status: 'Failed',
        delivery: 'Bounced',
        opened: 'No',
      },
      {
        company: 'Sakshi',
        email: 'sakshi123@gmail.com',
        status: 'Sent',
        delivery: 'Deliverd',
        opened: 'yes',
      },
      {
        company: 'Akshitha',
        email: 'Jobs40@gmail.com',
        status: 'Sent',
        delivery: 'Delivered',
        opened: 'No',
      },
      {
        company: 'BSE India',
        email: 'info@bseindia.in',
        status: 'Failed',
        delivery: 'Bounced',
        opened: 'No',
      },
    ];
  
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-Time Email Tracking</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Company Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Email Status</th>
              <th className="px-4 py-2 border-b">Delivery Status</th>
              <th className="px-4 py-2 border-b">Opened</th>
            </tr>
          </thead>
          <tbody>
            {emailData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{item.company}</td>
                <td className="px-4 py-2 border-b">{item.email}</td>
                <td className="px-4 py-2 border-b">{item.status}</td>
                <td className="px-4 py-2 border-b">{item.delivery}</td>
                <td className="px-4 py-2 border-b">{item.opened}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  