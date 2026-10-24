/**
 * CAMPUS TRANSPORTATION DIVISION (CTD) - MIT ADT UNIVERSITY
 * Clean, Flat, Professional Enterprise Transit App Controller
 * Features: Exact Image 4 Home Dashboard spec, flat clean styles,
 * Leaflet route map with live moving bus animation, prominent button sounds only, zero shadows.
 */

const AppState = {
  currentView: 'dashboard',
  selectedBusIndex: 4, // Defaults to Bus E - Lohegaon
  busKeys: [
    'bus-a', 'bus-b', 'bus-c', 'bus-d',
    'bus-e', 'bus-f', 'bus-g', 'bus-h',
    'bus-i', 'bus-j', 'bus-k', 'bus-l'
  ],
  busOptions: [
    'Bus A - Nigdi', 'Bus B - Chaphekar', 'Bus C - Sane Chowk', 'Bus D - Moshi',
    'Bus E - Lohegaon', 'Bus F - Pashan', 'Bus G - Hadapsar', 'Bus H - Kothrud',
    'Bus I - Katraj', 'Bus J - Viman Nagar', 'Bus K - Hinjawadi', 'Bus L - Magarpatta'
  ],
  dashDate: '2026-10-15',
  dashDateFormatted: '15/10/2026',
  dashAttendanceFilter: 'all',
  dashAttendanceSearch: '',
  dashSubtab: 'details',
  routeFilter: 'all',
  complaintFilter: 'all',
  activeChatRecipient: 'Sunil Verma (Bus M)',
  dashMap: null,
  dashBusTracker: null,
  dashPolyline: null,
  dashMarkersLayer: null,
  currentRouteId: 'bus-e',
  routeDetailMap: null,
  routeDetailBusTracker: null,
  routeDetailPolyline: null,
  routeDetailMarkersLayer: null,
  routeDetailFilteredPassengers: [],
  univBusFilter: 'all',
  currentBusDetailId: 'bus-u01',
  chatFilter: 'all',
  complaintCategoryFilter: 'all',
  complaintRouteFilter: 'all',
  dedicatedDriverFilter: 'all',
  passengerStatusFilter: 'all',
  passengerViewFilter: 'all',
  passengerDeptFilter: 'all',
  passengerFeeFilter: 'all',
  passengerRouteFilter: 'all',
  passengerViewMode: 'table'
};

// =============================================================================
// COMPREHENSIVE ROUTES & FLEET DATASET
// =============================================================================

const BUS_ROUTES_DETAILED = {
  'bus-e': {
    id: 'bus-e',
    name: 'Bus E - Lohegaon',
    corridor: 'Lohegaon Corridor • MIT Campus Loni',
    origin: 'Lohegaon Bus Stop',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '6:55 AM',
    arrival: '8:30 AM',
    time: '50 mins',
    enrolled: 39,
    cap: 49,
    bus: {
      plate: 'MH12-AB-1234',
      reg: 'Coach #14 • REG-5678',
      model: 'Tata Marcopolo 49 Seater Deluxe AC',
      capacity: '49 Seats (39 Enrolled)',
      owner: 'Tarawade Logistics Fleet',
      fuel: '82% Diesel (HPCL Loni)',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till Nov 2026',
      odometer: '42,850 km'
    },
    driver: {
      name: 'Arun Patil',
      photo: 'assets/driver-arun.jpg',
      phone: '+91 98474 32984',
      empId: '623JAGDIW',
      license: 'MH12-2018-DL88921',
      duty: 'On Duty',
      attendance: '96% (26/28 Days)',
      exp: '4.5 Years',
      rating: '4.9 / 5.0'
    },
    stops: [
      { number: 1, name: 'Lohegaon Bus Stop', lat: 18.5913, lng: 73.9242, time: '6:55 AM', distance: '0.0 km', boardingCount: 6 },
      { number: 2, name: 'Kendriya Vidhyalaya', lat: 18.5821, lng: 73.9298, time: '7:05 AM', distance: '1.4 km', boardingCount: 4 },
      { number: 3, name: 'Khese Park', lat: 18.5742, lng: 73.9351, time: '7:12 AM', distance: '2.8 km', boardingCount: 5 },
      { number: 4, name: 'Kalwad', lat: 18.5670, lng: 73.9405, time: '7:20 AM', distance: '4.1 km', boardingCount: 3 },
      { number: 5, name: 'Symbiosis College', lat: 18.5615, lng: 73.9520, time: '7:30 AM', distance: '5.9 km', boardingCount: 4 },
      { number: 6, name: 'Ramwadi Police St.', lat: 18.5524, lng: 73.9167, time: '7:40 AM', distance: '7.8 km', boardingCount: 5 },
      { number: 7, name: 'Novotel Hotel', lat: 18.5562, lng: 73.9130, time: '7:48 AM', distance: '9.2 km', boardingCount: 2 },
      { number: 8, name: 'Phoenix Mall', lat: 18.5601, lng: 73.9315, time: '7:55 AM', distance: '11.0 km', boardingCount: 4 },
      { number: 9, name: 'Tata Guard Room', lat: 18.5442, lng: 73.9650, time: '8:05 AM', distance: '14.5 km', boardingCount: 3 },
      { number: 10, name: 'Chandan Nagar Bypass', lat: 18.5539, lng: 73.9472, time: '8:15 AM', distance: '17.2 km', boardingCount: 3 },
      { number: 11, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:30 AM', distance: '28.4 km', boardingCount: 0 }
    ],
    passengers: [
      { rollNo: 'ADT23IODB009', name: 'Priya Deshmukh', phone: '+91 98231 44512', boardingStop: 'Lohegaon Bus Stop', dept: 'School of Design', status: 'Paid' },
      { rollNo: 'ADT23IODB012', name: 'Rohan Kulkarni', phone: '+91 97654 11234', boardingStop: 'Kendriya Vidhyalaya', dept: 'School of Engineering', status: 'Pending' },
      { rollNo: 'ADT23IODB045', name: 'Sneha Patil', phone: '+91 99220 88712', boardingStop: 'Khese Park', dept: 'Institute of Design', status: 'Paid' },
      { rollNo: 'ADT23IODB088', name: 'Arjun Sharma', phone: '+91 98451 99014', boardingStop: 'Kalwad', dept: 'School of Engineering', status: 'Paid' },
      { rollNo: 'ADT23FAC001', name: 'Dr. Sarah Miller', phone: '+91 91234 56789', boardingStop: 'Symbiosis College', dept: 'Faculty of Architecture', status: 'Paid' },
      { rollNo: 'ADT23IODB112', name: 'Vikhyat Kaushik', phone: '+91 98901 23456', boardingStop: 'Ramwadi Police St.', dept: 'School of Design', status: 'Paid' },
      { rollNo: 'ADT23IODB130', name: 'Ananya Joshi', phone: '+91 98221 44556', boardingStop: 'Novotel Hotel', dept: 'School of Management', status: 'Paid' },
      { rollNo: 'ADT23IODB142', name: 'Kunal Ghorpade', phone: '+91 97665 33441', boardingStop: 'Phoenix Mall', dept: 'School of Computing', status: 'Pending' },
      { rollNo: 'ADT23IODB155', name: 'Neha Chawla', phone: '+91 98900 11223', boardingStop: 'Tata Guard Room', dept: 'School of Design', status: 'Paid' },
      { rollNo: 'ADT23IODB167', name: 'Tanmay Salunkhe', phone: '+91 98230 77889', boardingStop: 'Chandan Nagar Bypass', dept: 'School of Engineering', status: 'Paid' },
      { rollNo: 'ADT23IODB189', name: 'Rituja Shinde', phone: '+91 98199 44332', boardingStop: 'Khese Park', dept: 'School of Architecture', status: 'Paid' },
      { rollNo: 'ADT23IODB201', name: 'Manish Verma', phone: '+91 98670 99881', boardingStop: 'Lohegaon Bus Stop', dept: 'School of Engineering', status: 'Paid' }
    ]
  },

  'bus-a': {
    id: 'bus-a',
    name: 'Bus A - Nigdi',
    corridor: 'Nigdi Pradhikaran Corridor • MIT Campus Loni',
    origin: 'Nigdi Pradhikaran',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '6:40 AM',
    arrival: '8:25 AM',
    time: '45 mins',
    enrolled: 28,
    cap: 49,
    bus: {
      plate: 'MH12-CD-5678',
      reg: 'Coach #09 • REG-1192',
      model: 'Ashok Leyland 49 Deluxe High-Deck',
      capacity: '49 Seats (28 Enrolled)',
      owner: 'MIT ADT University Owned',
      fuel: '88% Diesel (Internal Pump)',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till Nov 2026',
      odometer: '38,120 km'
    },
    driver: {
      name: 'Santosh Jadhav',
      photo: 'assets/driver-santosh.jpg',
      phone: '+91 83368 18273',
      empId: 'MIT-DRV-102',
      license: 'MH12-2016-DL44019',
      duty: 'On Duty',
      attendance: '98% (27/28 Days)',
      exp: '5.2 Years',
      rating: '4.9 / 5.0'
    },
    stops: [
      { number: 1, name: 'Nigdi Pradhikaran', lat: 18.6534, lng: 73.7667, time: '6:40 AM', distance: '0.0 km', boardingCount: 4 },
      { number: 2, name: 'Akurdi Railway Stn', lat: 18.6493, lng: 73.7707, time: '6:50 AM', distance: '2.1 km', boardingCount: 4 },
      { number: 3, name: 'Chinchwad Station', lat: 18.6310, lng: 73.7915, time: '7:00 AM', distance: '4.8 km', boardingCount: 4 },
      { number: 4, name: 'Pimpri Chowk', lat: 18.6279, lng: 73.8009, time: '7:10 AM', distance: '6.5 km', boardingCount: 3 },
      { number: 5, name: 'Kasarwadi', lat: 18.5993, lng: 73.8210, time: '7:20 AM', distance: '9.2 km', boardingCount: 3 },
      { number: 6, name: 'Dapodi Bridge', lat: 18.5779, lng: 73.8312, time: '7:30 AM', distance: '12.0 km', boardingCount: 3 },
      { number: 7, name: 'Pune Station Bypass', lat: 18.5284, lng: 73.8744, time: '7:45 AM', distance: '18.4 km', boardingCount: 3 },
      { number: 8, name: 'Hadapsar Gadital', lat: 18.5089, lng: 73.9259, time: '8:05 AM', distance: '24.1 km', boardingCount: 4 },
      { number: 9, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:25 AM', distance: '34.6 km', boardingCount: 0 }
    ],
    passengers: [
      // Stop 1: Nigdi Pradhikaran (4 passengers)
      { rollNo: 'ADT23IODB088', name: 'Arjun Sharma', phone: '+91 98451 99014', boardingStop: 'Nigdi Pradhikaran', dept: 'School of Engineering', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23ENG014', name: 'Ananya Deshmukh', phone: '+91 98220 44192', boardingStop: 'Nigdi Pradhikaran', dept: 'School of Design', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23CMP052', name: 'Rohan Kulkarni', phone: '+91 97664 12890', boardingStop: 'Nigdi Pradhikaran', dept: 'School of Computing', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23MGT009', name: 'Shweta Bhosale', phone: '+91 99214 77301', boardingStop: 'Nigdi Pradhikaran', dept: 'School of Management', status: 'Pending', passStatus: 'Not collected' },

      // Stop 2: Akurdi Railway Stn (4 passengers)
      { rollNo: 'ADT23IODB112', name: 'Vikhyat Kaushik', phone: '+91 98901 23456', boardingStop: 'Akurdi Railway Stn', dept: 'School of Design', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23ENG068', name: 'Tanvi Gaikwad', phone: '+91 98455 31204', boardingStop: 'Akurdi Railway Stn', dept: 'School of Engineering', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23CMP091', name: 'Aditya Chougule', phone: '+91 97652 88419', boardingStop: 'Akurdi Railway Stn', dept: 'School of Computing', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23ARC015', name: 'Pooja Salunkhe', phone: '+91 98231 66504', boardingStop: 'Akurdi Railway Stn', dept: 'School of Architecture', status: 'Paid', passStatus: 'Not collected' },

      // Stop 3: Chinchwad Station (4 passengers)
      { rollNo: 'ADT23ENG042', name: 'Vaibhav Sharma', phone: '+91 98221 00921', boardingStop: 'Chinchwad Station', dept: 'School of Engineering', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23CMP104', name: 'Rakesh Mohite', phone: '+91 98902 44781', boardingStop: 'Chinchwad Station', dept: 'School of Computing', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23MGT033', name: 'Neha Shinde', phone: '+91 97640 19328', boardingStop: 'Chinchwad Station', dept: 'School of Management', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23FAC012', name: 'Dr. Anand Kulkarni', phone: '+91 98110 55432', boardingStop: 'Chinchwad Station', dept: 'Faculty of Engineering', status: 'Paid', passStatus: 'Collected' },

      // Stop 4: Pimpri Chowk (3 passengers)
      { rollNo: 'ADT23MGT018', name: 'Ritu Verma', phone: '+91 97665 44102', boardingStop: 'Pimpri Chowk', dept: 'School of Management', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23ENG119', name: 'Saurabh Jadhav', phone: '+91 98234 88109', boardingStop: 'Pimpri Chowk', dept: 'School of Engineering', status: 'Pending', passStatus: 'Not collected' },
      { rollNo: 'ADT23IODB071', name: 'Snehal Wagh', phone: '+91 98450 66219', boardingStop: 'Pimpri Chowk', dept: 'School of Design', status: 'Paid', passStatus: 'Collected' },

      // Stop 5: Kasarwadi (3 passengers)
      { rollNo: 'ADT23IODB054', name: 'Omkar Patil', phone: '+91 99223 88120', boardingStop: 'Kasarwadi', dept: 'School of Computing', status: 'Pending', passStatus: 'Not collected' },
      { rollNo: 'ADT23ARC044', name: 'Meera Nair', phone: '+91 98900 11782', boardingStop: 'Kasarwadi', dept: 'School of Architecture', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23ENG087', name: 'Harshavardhan Pawar', phone: '+91 97651 22934', boardingStop: 'Kasarwadi', dept: 'School of Engineering', status: 'Paid', passStatus: 'Collected' },

      // Stop 6: Dapodi Bridge (3 passengers)
      { rollNo: 'ADT23FAC004', name: 'Suresh Pal', phone: '+91 98112 77651', boardingStop: 'Dapodi Bridge', dept: 'Faculty of Technology', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23CMP038', name: 'Divya Jagtap', phone: '+91 98228 99401', boardingStop: 'Dapodi Bridge', dept: 'School of Computing', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23MGT047', name: 'Kunal Bhalerao', phone: '+91 98459 33170', boardingStop: 'Dapodi Bridge', dept: 'School of Management', status: 'Paid', passStatus: 'Collected' },

      // Stop 7: Pune Station Bypass (3 passengers)
      { rollNo: 'ADT23ENG105', name: 'Shreya Deshmukh', phone: '+91 98450 11992', boardingStop: 'Pune Station Bypass', dept: 'School of Engineering', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23IODB029', name: 'Gaurav Tawde', phone: '+91 97644 88201', boardingStop: 'Pune Station Bypass', dept: 'School of Design', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23CMP120', name: 'Nikhil Shirke', phone: '+91 98904 77123', boardingStop: 'Pune Station Bypass', dept: 'School of Computing', status: 'Paid', passStatus: 'Not collected' },

      // Stop 8: Hadapsar Gadital (4 passengers)
      { rollNo: 'ADT23ARC031', name: 'Prathamesh More', phone: '+91 97651 88321', boardingStop: 'Hadapsar Gadital', dept: 'School of Architecture', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23ENG148', name: 'Aakash Mane', phone: '+91 98224 55902', boardingStop: 'Hadapsar Gadital', dept: 'School of Engineering', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23MGT058', name: 'Shruti Chavan', phone: '+91 98452 33418', boardingStop: 'Hadapsar Gadital', dept: 'School of Management', status: 'Paid', passStatus: 'Collected' },
      { rollNo: 'ADT23FAC019', name: 'Sunita Joshi', phone: '+91 98115 66089', boardingStop: 'Hadapsar Gadital', dept: 'Faculty of Design', status: 'Paid', passStatus: 'Collected' }
    ]
  },

  'bus-b': {
    id: 'bus-b',
    name: 'Bus B - Chaphekar Chowk',
    corridor: 'Chaphekar Chowk Corridor • MIT Campus Loni',
    origin: 'Chaphekar Chowk',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '6:50 AM',
    arrival: '8:35 AM',
    time: '55 mins',
    enrolled: 26,
    cap: 49,
    bus: {
      plate: 'MH12-EF-9012',
      reg: 'Coach #21 • REG-3310',
      model: 'Tata Marcopolo 49 Seater Standard',
      capacity: '49 Seats (26 Enrolled)',
      owner: 'Tarawade Logistics Fleet',
      fuel: '74% Diesel (HPCL Hinjewadi)',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till Oct 2026',
      odometer: '51,400 km'
    },
    driver: {
      name: 'Vijay Kumar',
      photo: 'assets/driver-vijay.jpg',
      phone: '+91 97654 32189',
      empId: 'TW-DRV-045',
      license: 'MH12-2017-DL22391',
      duty: 'On Duty',
      attendance: '94% (25/28 Days)',
      exp: '4.0 Years',
      rating: '4.8 / 5.0'
    },
    stops: [
      { number: 1, name: 'Chaphekar Chowk', lat: 18.6250, lng: 73.7900, time: '6:50 AM', distance: '0.0 km', boardingCount: 4 },
      { number: 2, name: 'Dange Chowk', lat: 18.6010, lng: 73.7780, time: '7:00 AM', distance: '3.2 km', boardingCount: 3 },
      { number: 3, name: 'Wakad Bridge', lat: 18.5980, lng: 73.7650, time: '7:08 AM', distance: '5.1 km', boardingCount: 3 },
      { number: 4, name: 'Hinjewadi Flyover', lat: 18.5890, lng: 73.7540, time: '7:16 AM', distance: '7.0 km', boardingCount: 2 },
      { number: 5, name: 'Baner Phata', lat: 18.5590, lng: 73.7860, time: '7:26 AM', distance: '11.4 km', boardingCount: 4 },
      { number: 6, name: 'University Gate', lat: 18.5520, lng: 73.8260, time: '7:36 AM', distance: '16.2 km', boardingCount: 3 },
      { number: 7, name: 'Shivajinagar Stn', lat: 18.5310, lng: 73.8440, time: '7:46 AM', distance: '19.5 km', boardingCount: 3 },
      { number: 8, name: 'Swargate Depot', lat: 18.5010, lng: 73.8580, time: '7:58 AM', distance: '23.6 km', boardingCount: 2 },
      { number: 9, name: 'Hadapsar Bypass', lat: 18.5089, lng: 73.9259, time: '8:15 AM', distance: '30.8 km', boardingCount: 2 },
      { number: 10, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:35 AM', distance: '41.2 km', boardingCount: 0 }
    ],
    passengers: [
      { rollNo: 'ADT23IODB045', name: 'Sneha Patil', phone: '+91 99220 88712', boardingStop: 'Chaphekar Chowk', dept: 'School of Design', status: 'Overdue' },
      { rollNo: 'ADT23ENG089', name: 'Karan Wagh', phone: '+91 98224 55109', boardingStop: 'Dange Chowk', dept: 'School of Engineering', status: 'Paid' },
      { rollNo: 'ADT23CMP112', name: 'Pooja Nair', phone: '+91 97652 99401', boardingStop: 'Wakad Bridge', dept: 'School of Computing', status: 'Paid' },
      { rollNo: 'ADT23MGT044', name: 'Gaurav Shinde', phone: '+91 98904 33210', boardingStop: 'Hinjewadi Flyover', dept: 'School of Management', status: 'Paid' },
      { rollNo: 'ADT23ARC019', name: 'Isha Kulkarni', phone: '+91 98453 66720', boardingStop: 'Baner Phata', dept: 'School of Architecture', status: 'Paid' },
      { rollNo: 'ADT23IODB150', name: 'Dev Rathod', phone: '+91 98231 77092', boardingStop: 'University Gate', dept: 'School of Design', status: 'Paid' },
      { rollNo: 'ADT23ENG167', name: 'Swati Bhosale', phone: '+91 97660 11482', boardingStop: 'Shivajinagar Stn', dept: 'School of Engineering', status: 'Paid' },
      { rollNo: 'ADT23CMP088', name: 'Rahul Kamble', phone: '+91 98901 88920', boardingStop: 'Swargate Depot', dept: 'School of Computing', status: 'Paid' }
    ]
  },

  'bus-d': {
    id: 'bus-d',
    name: 'Bus D - Moshi',
    corridor: 'Moshi Spine Road Corridor • MIT Campus Loni',
    origin: 'Moshi Toll Naka',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '6:50 AM',
    arrival: '8:30 AM',
    time: '40 mins',
    enrolled: 34,
    cap: 49,
    bus: {
      plate: 'MH12-IJ-3344',
      reg: 'Coach #18 • REG-7721',
      model: 'Tata Marcopolo 49 Seater Deluxe AC',
      capacity: '49 Seats (34 Enrolled)',
      owner: 'Tarawade Logistics Fleet',
      fuel: '80% Diesel (Bhosari Pump)',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till Dec 2026',
      odometer: '46,310 km'
    },
    driver: {
      name: 'Ramesh Shinde',
      photo: 'assets/driver-ramesh.jpg',
      phone: '+91 98555 43210',
      empId: 'TW-DRV-088',
      license: 'MH12-2015-DL88102',
      duty: 'On Duty',
      attendance: '97% (27/28 Days)',
      exp: '6.0 Years',
      rating: '4.9 / 5.0'
    },
    stops: [
      { number: 1, name: 'Moshi Toll Naka', lat: 18.6750, lng: 73.8450, time: '6:50 AM', distance: '0.0 km', boardingCount: 5 },
      { number: 2, name: 'Spine Road Mall', lat: 18.6520, lng: 73.8400, time: '6:58 AM', distance: '2.8 km', boardingCount: 4 },
      { number: 3, name: 'Bhosari Gaonthan', lat: 18.6280, lng: 73.8480, time: '7:08 AM', distance: '5.9 km', boardingCount: 5 },
      { number: 4, name: 'Nashik Phata', lat: 18.6040, lng: 73.8260, time: '7:18 AM', distance: '9.4 km', boardingCount: 4 },
      { number: 5, name: 'Sangamwadi Bridge', lat: 18.5360, lng: 73.8640, time: '7:32 AM', distance: '17.8 km', boardingCount: 3 },
      { number: 6, name: 'Yerwada Post', lat: 18.5520, lng: 73.8820, time: '7:42 AM', distance: '20.6 km', boardingCount: 4 },
      { number: 7, name: 'Kalyani Nagar', lat: 18.5460, lng: 73.9040, time: '7:52 AM', distance: '23.4 km', boardingCount: 3 },
      { number: 8, name: 'Magarpatta South', lat: 18.5140, lng: 73.9280, time: '8:05 AM', distance: '28.1 km', boardingCount: 4 },
      { number: 9, name: 'Manjari Phata', lat: 18.5080, lng: 73.9720, time: '8:18 AM', distance: '32.9 km', boardingCount: 2 },
      { number: 10, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:30 AM', distance: '39.8 km', boardingCount: 0 }
    ],
    passengers: [
      { rollNo: 'ADT23IODB104', name: 'Tanya Mehra', phone: '+91 98223 99401', boardingStop: 'Moshi Toll Naka', dept: 'School of Design', status: 'Paid' },
      { rollNo: 'ADT23ENG077', name: 'Devendra Rathore', phone: '+91 98450 44102', boardingStop: 'Spine Road Mall', dept: 'School of Engineering', status: 'Paid' },
      { rollNo: 'ADT23CMP092', name: 'Shweta Kadam', phone: '+91 97664 11802', boardingStop: 'Bhosari Gaonthan', dept: 'School of Computing', status: 'Paid' },
      { rollNo: 'ADT23MGT055', name: 'Mohit Sen', phone: '+91 98902 33491', boardingStop: 'Nashik Phata', dept: 'School of Management', status: 'Paid' },
      { rollNo: 'ADT23ARC040', name: 'Nidhi Chavan', phone: '+91 98231 66720', boardingStop: 'Sangamwadi Bridge', dept: 'School of Architecture', status: 'Paid' },
      { rollNo: 'ADT23IODB166', name: 'Rohit Ghate', phone: '+91 97652 88401', boardingStop: 'Yerwada Post', dept: 'School of Design', status: 'Paid' },
      { rollNo: 'ADT23ENG180', name: 'Mayur Pawar', phone: '+91 98453 00192', boardingStop: 'Kalyani Nagar', dept: 'School of Engineering', status: 'Paid' },
      { rollNo: 'ADT23CMP129', name: 'Rashmi Sawant', phone: '+91 98901 77310', boardingStop: 'Magarpatta South', dept: 'School of Computing', status: 'Paid' }
    ]
  },

  'bus-f': {
    id: 'bus-f',
    name: 'Bus F - Pashan',
    corridor: 'Pashan & Kothrud Corridor • MIT Campus Loni',
    origin: 'Pashan Circle',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '6:45 AM',
    arrival: '8:35 AM',
    time: '60 mins',
    enrolled: 30,
    cap: 49,
    bus: {
      plate: 'MH12-KL-5566',
      reg: 'Coach #28 • REG-9912',
      model: 'Tata Marcopolo 49 Seater Deluxe AC',
      capacity: '49 Seats (30 Enrolled)',
      owner: 'Tarawade Logistics Fleet',
      fuel: '79% Diesel (Kothrud Pump)',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till Jan 2027',
      odometer: '35,800 km'
    },
    driver: {
      name: 'Sanjay Deshmukh',
      photo: 'assets/driver-sanjay.jpg',
      phone: '+91 98223 88124',
      empId: 'TW-DRV-112',
      license: 'MH12-2016-DL33021',
      duty: 'On Duty',
      attendance: '95% (26/28 Days)',
      exp: '5.5 Years',
      rating: '4.8 / 5.0'
    },
    stops: [
      { number: 1, name: 'Pashan Circle', lat: 18.5340, lng: 73.7840, time: '6:45 AM', distance: '0.0 km', boardingCount: 4 },
      { number: 2, name: 'Bavdhan Chowk', lat: 18.5160, lng: 73.7740, time: '6:55 AM', distance: '3.1 km', boardingCount: 3 },
      { number: 3, name: 'Chandani Chowk', lat: 18.5060, lng: 73.7850, time: '7:04 AM', distance: '5.2 km', boardingCount: 4 },
      { number: 4, name: 'Kothrud Stand', lat: 18.5070, lng: 73.8050, time: '7:14 AM', distance: '7.8 km', boardingCount: 3 },
      { number: 5, name: 'Deccan Gymkhana', lat: 18.5170, lng: 73.8410, time: '7:26 AM', distance: '12.0 km', boardingCount: 4 },
      { number: 6, name: 'Swargate Corner', lat: 18.5010, lng: 73.8580, time: '7:38 AM', distance: '15.4 km', boardingCount: 3 },
      { number: 7, name: 'Camp East Street', lat: 18.5120, lng: 73.8780, time: '7:50 AM', distance: '18.9 km', boardingCount: 3 },
      { number: 8, name: 'Fatima Nagar', lat: 18.5040, lng: 73.9010, time: '8:02 AM', distance: '22.1 km', boardingCount: 3 },
      { number: 9, name: 'Hadapsar Flyover', lat: 18.5089, lng: 73.9259, time: '8:14 AM', distance: '25.6 km', boardingCount: 3 },
      { number: 10, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:35 AM', distance: '36.8 km', boardingCount: 0 }
    ],
    passengers: [
      { rollNo: 'ADT23IODB210', name: 'Aditya Rao', phone: '+91 98224 88102', boardingStop: 'Pashan Circle', dept: 'School of Design', status: 'Paid' },
      { rollNo: 'ADT23ENG199', name: 'Meera Nair', phone: '+91 98451 33201', boardingStop: 'Bavdhan Chowk', dept: 'School of Engineering', status: 'Paid' },
      { rollNo: 'ADT23CMP145', name: 'Sagar Jagtap', phone: '+91 97660 77412', boardingStop: 'Chandani Chowk', dept: 'School of Computing', status: 'Paid' },
      { rollNo: 'ADT23MGT082', name: 'Ishaan Dixit', phone: '+91 98903 22194', boardingStop: 'Kothrud Stand', dept: 'School of Management', status: 'Paid' },
      { rollNo: 'ADT23ARC055', name: 'Harshada More', phone: '+91 98230 44102', boardingStop: 'Deccan Gymkhana', dept: 'School of Architecture', status: 'Paid' },
      { rollNo: 'ADT23IODB240', name: 'Chinmay Joshi', phone: '+91 97652 11983', boardingStop: 'Swargate Corner', dept: 'School of Design', status: 'Paid' },
      { rollNo: 'ADT23ENG215', name: 'Divya Kulkarni', phone: '+91 98452 88401', boardingStop: 'Camp East Street', dept: 'School of Engineering', status: 'Paid' },
      { rollNo: 'ADT23CMP166', name: 'Tejas Shinde', phone: '+91 98901 66320', boardingStop: 'Fatima Nagar', dept: 'School of Computing', status: 'Pending' }
    ]
  },

  'bus-c': {
    id: 'bus-c',
    name: 'Bus C - Sane Chowk',
    corridor: 'Sane Chowk Depot Corridor • MIT Campus Loni',
    origin: 'Sane Chowk',
    dest: 'MIT Campus Loni',
    status: 'maintenance',
    departure: 'Under Maintenance',
    arrival: 'Suspended',
    time: 'Under maintenance',
    enrolled: 0,
    cap: 49,
    bus: {
      plate: 'MH12-GH-1122',
      reg: 'Coach #05 • REG-8812',
      model: 'Tata Marcopolo 49 Seater Standard',
      capacity: '49 Seats (0 Enrolled)',
      owner: 'MIT ADT University Owned',
      fuel: '60% Diesel (Workshop Berth)',
      status: 'Under Maintenance',
      governor: 'Workshop Calibrated',
      fitness: 'Audit Scheduled',
      odometer: '62,100 km'
    },
    driver: {
      name: 'Prakash Jagtap',
      photo: 'assets/driver-prakash.jpg',
      phone: '+91 98112 34567',
      empId: 'MIT-DRV-082',
      license: 'MH12-2014-DL11029',
      duty: 'Workshop Standby',
      attendance: '92% (24/28 Days)',
      exp: '4.0 Years',
      rating: '4.7 / 5.0'
    },
    stops: [
      { number: 1, name: 'Sane Chowk Depot', lat: 18.6650, lng: 73.8100, time: 'Scheduled Inspection', distance: '0.0 km', boardingCount: 0 },
      { number: 2, name: 'Chikhali Central', lat: 18.6550, lng: 73.8150, time: 'Rerouted to Bus A', distance: '2.5 km', boardingCount: 0 },
      { number: 3, name: 'Thermax Chowk', lat: 18.6480, lng: 73.8180, time: 'Rerouted to Bus A', distance: '4.8 km', boardingCount: 0 },
      { number: 4, name: 'Akurdi Flyover', lat: 18.6493, lng: 73.7707, time: 'Rerouted to Bus A', distance: '8.2 km', boardingCount: 0 },
      { number: 5, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: 'Scheduled Depot End', distance: '36.0 km', boardingCount: 0 }
    ],
    passengers: []
  },

  'bus-g': {
    id: 'bus-g',
    name: 'Bus G - Hadapsar',
    corridor: 'Hadapsar Gadital Corridor • MIT Campus Loni',
    origin: 'Hadapsar Gadital',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '7:10 AM',
    arrival: '8:25 AM',
    time: '45 mins',
    enrolled: 44,
    cap: 49,
    bus: {
      plate: 'MH12-GH-8812',
      reg: 'Coach #07 • REG-7711',
      model: 'Ashok Leyland 49 Deluxe High-Deck',
      capacity: '49 Seats (44 Enrolled)',
      owner: 'Tarawade Logistics Fleet',
      fuel: '88% Diesel',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till Dec 2026',
      odometer: '38,200 km'
    },
    driver: {
      name: 'Tanaji More',
      photo: 'assets/driver-tanaji.jpg',
      phone: '+91 98220 99441',
      empId: 'MIT-DRV-110',
      license: 'MH12-2015-DL88109',
      duty: 'On Duty',
      attendance: '98% (27/28 Days)',
      exp: '5.5 Years',
      rating: '4.9 / 5.0'
    },
    stops: [
      { number: 1, name: 'Hadapsar Gadital', lat: 18.5018, lng: 73.9262, time: '7:10 AM', distance: '0.0 km', boardingCount: 10 },
      { number: 2, name: 'Vaiduwadi Chowk', lat: 18.5080, lng: 73.9350, time: '7:20 AM', distance: '2.3 km', boardingCount: 6 },
      { number: 3, name: 'Magarpatta South Gate', lat: 18.5140, lng: 73.9420, time: '7:30 AM', distance: '4.5 km', boardingCount: 8 },
      { number: 4, name: 'Manjari Phata', lat: 18.5120, lng: 73.9680, time: '7:42 AM', distance: '8.1 km', boardingCount: 7 },
      { number: 5, name: 'Shewalewadi Corner', lat: 18.5020, lng: 73.9850, time: '7:55 AM', distance: '12.4 km', boardingCount: 6 },
      { number: 6, name: 'Loni Kalbhor Station', lat: 18.4950, lng: 74.0120, time: '8:10 AM', distance: '18.9 km', boardingCount: 7 },
      { number: 7, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:25 AM', distance: '22.0 km', boardingCount: 0 }
    ],
    passengers: [
      { rollNo: 'ADT23IODB301', name: 'Tanvi Bhosale', phone: '+91 98221 11001', boardingStop: 'Hadapsar Gadital', dept: 'Institute of Design', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:12 AM' },
      { rollNo: 'ADT23IODB302', name: 'Abhishek Shinde', phone: '+91 98221 11002', boardingStop: 'Hadapsar Gadital', dept: 'School of Engineering', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:15 AM' },
      { rollNo: 'ADT23FAC007', name: 'Prof. Sandeep Joshi', phone: '+91 98221 11003', boardingStop: 'Magarpatta South Gate', dept: 'School of Computing', status: 'Paid', type: 'Faculty', attendance: 'Present', time: '7:31 AM' },
      { rollNo: 'ADT23IODB304', name: 'Gaurav Kulkarni', phone: '+91 98221 11004', boardingStop: 'Manjari Phata', dept: 'School of Design', status: 'Paid', type: 'Student', attendance: 'Absent', time: '-' },
      { rollNo: 'ADT23IODB305', name: 'Rutuja Jagtap', phone: '+91 98221 11005', boardingStop: 'Vaiduwadi Chowk', dept: 'College of Management', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:22 AM' },
      { rollNo: 'ADT23FAC008', name: 'Dr. Anita Deshmukh', phone: '+91 98221 11006', boardingStop: 'Shewalewadi Corner', dept: 'School of Bioengineering', status: 'Paid', type: 'Faculty', attendance: 'Present', time: '7:57 AM' },
      { rollNo: 'ADT23IODB307', name: 'Sameer More', phone: '+91 98221 11007', boardingStop: 'Loni Kalbhor Station', dept: 'School of Architecture', status: 'Pending', type: 'Student', attendance: 'Present', time: '8:11 AM' },
      { rollNo: 'ADT23IODB308', name: 'Ishita Roy', phone: '+91 98221 11008', boardingStop: 'Hadapsar Gadital', dept: 'Institute of Design', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:14 AM' }
    ]
  },

  'bus-h': {
    id: 'bus-h',
    name: 'Bus H - Kothrud',
    corridor: 'Kothrud Stand • MIT Campus Loni',
    origin: 'Kothrud Stand',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '6:45 AM',
    arrival: '8:25 AM',
    time: '55 mins',
    enrolled: 41,
    cap: 49,
    bus: {
      plate: 'MH12-KH-7721',
      reg: 'Coach #08 • REG-8822',
      model: 'Tata Starbus Ultra 49 AC Deluxe',
      capacity: '49 Seats (41 Enrolled)',
      owner: 'MIT ADT University Owned',
      fuel: '92% CNG Clean',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till Jan 2027',
      odometer: '29,400 km'
    },
    driver: {
      name: 'Sambhaji Kadam',
      photo: 'assets/driver-sambhaji.jpg',
      phone: '+91 98455 77810',
      empId: 'MIT-DRV-103',
      license: 'MH12-2018-DL55410',
      duty: 'On Duty',
      attendance: '97% (27/28 Days)',
      exp: '5.0 Years',
      rating: '4.9 / 5.0'
    },
    stops: [
      { number: 1, name: 'Kothrud Stand', lat: 18.5074, lng: 73.8077, time: '6:45 AM', distance: '0.0 km', boardingCount: 12 },
      { number: 2, name: 'Karve Statue', lat: 18.5020, lng: 73.8180, time: '6:58 AM', distance: '2.1 km', boardingCount: 8 },
      { number: 3, name: 'Nal Stop', lat: 18.5050, lng: 73.8320, time: '7:12 AM', distance: '4.4 km', boardingCount: 6 },
      { number: 4, name: 'Deccan Corner', lat: 18.5170, lng: 73.8420, time: '7:25 AM', distance: '6.8 km', boardingCount: 5 },
      { number: 5, name: 'Swargate Junction', lat: 18.5010, lng: 73.8580, time: '7:45 AM', distance: '10.5 km', boardingCount: 6 },
      { number: 6, name: 'Hadapsar Bypass', lat: 18.5020, lng: 73.9350, time: '8:05 AM', distance: '19.2 km', boardingCount: 4 },
      { number: 7, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:25 AM', distance: '31.5 km', boardingCount: 0 }
    ],
    passengers: [
      { rollNo: 'ADT23IODB401', name: 'Aditya Kulkarni', phone: '+91 98233 22001', boardingStop: 'Kothrud Stand', dept: 'School of Design', status: 'Paid', type: 'Student', attendance: 'Present', time: '6:48 AM' },
      { rollNo: 'ADT23FAC009', name: 'Dr. Ramesh Phadke', phone: '+91 98233 22002', boardingStop: 'Karve Statue', dept: 'School of Engineering', status: 'Paid', type: 'Faculty', attendance: 'Present', time: '7:01 AM' },
      { rollNo: 'ADT23IODB403', name: 'Pooja Marathe', phone: '+91 98233 22003', boardingStop: 'Nal Stop', dept: 'Institute of Design', status: 'Paid', type: 'Student', attendance: 'Absent', time: '-' },
      { rollNo: 'ADT23IODB404', name: 'Varun Chitale', phone: '+91 98233 22004', boardingStop: 'Deccan Corner', dept: 'College of Management', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:28 AM' },
      { rollNo: 'ADT23FAC010', name: 'Prof. Shilpa Ranade', phone: '+91 98233 22005', boardingStop: 'Swargate Junction', dept: 'Institute of Design (IOD)', status: 'Paid', type: 'Faculty', attendance: 'Present', time: '7:47 AM' },
      { rollNo: 'ADT23IODB406', name: 'Chinmay Oak', phone: '+91 98233 22006', boardingStop: 'Kothrud Stand', dept: 'School of Computing', status: 'Paid', type: 'Student', attendance: 'Present', time: '6:49 AM' }
    ]
  },

  'bus-i': {
    id: 'bus-i',
    name: 'Bus I - Katraj',
    corridor: 'Katraj Hub • MIT Campus Loni',
    origin: 'Katraj Bus Depot',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '7:00 AM',
    arrival: '8:30 AM',
    time: '50 mins',
    enrolled: 38,
    cap: 49,
    bus: {
      plate: 'MH12-KT-3390',
      reg: 'Coach #09 • REG-9933',
      model: 'Ashok Leyland 49 Deluxe High-Deck',
      capacity: '49 Seats (38 Enrolled)',
      owner: 'MIT ADT University Owned',
      fuel: '85% Diesel',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till Mar 2027',
      odometer: '33,100 km'
    },
    driver: {
      name: 'Chandrakant Mane',
      photo: 'assets/driver-chandrakant.jpg',
      phone: '+91 97664 88201',
      empId: 'MIT-DRV-105',
      license: 'MH12-2017-DL77102',
      duty: 'On Duty',
      attendance: '96% (26/28 Days)',
      exp: '4.8 Years',
      rating: '4.9 / 5.0'
    },
    stops: [
      { number: 1, name: 'Katraj Bus Depot', lat: 18.4550, lng: 73.8650, time: '7:00 AM', distance: '0.0 km', boardingCount: 11 },
      { number: 2, name: 'Bharati Vidyapeeth', lat: 18.4600, lng: 73.8580, time: '7:12 AM', distance: '2.0 km', boardingCount: 7 },
      { number: 3, name: 'Market Yard Gate', lat: 18.4850, lng: 73.8720, time: '7:28 AM', distance: '5.8 km', boardingCount: 6 },
      { number: 4, name: 'Kondhwa Main Chowk', lat: 18.4780, lng: 73.8950, time: '7:42 AM', distance: '9.4 km', boardingCount: 7 },
      { number: 5, name: 'Undri Phata', lat: 18.4650, lng: 73.9200, time: '7:58 AM', distance: '14.2 km', boardingCount: 7 },
      { number: 6, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:30 AM', distance: '26.8 km', boardingCount: 0 }
    ],
    passengers: [
      { rollNo: 'ADT23IODB501', name: 'Pranav Jagtap', phone: '+91 98901 33001', boardingStop: 'Katraj Bus Depot', dept: 'School of Design', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:03 AM' },
      { rollNo: 'ADT23FAC011', name: 'Dr. Vivek Kulkarni', phone: '+91 98901 33002', boardingStop: 'Bharati Vidyapeeth', dept: 'School of Computing', status: 'Paid', type: 'Faculty', attendance: 'Present', time: '7:15 AM' },
      { rollNo: 'ADT23IODB503', name: 'Tejaswini Patil', phone: '+91 98901 33003', boardingStop: 'Kondhwa Main Chowk', dept: 'School of Engineering', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:44 AM' },
      { rollNo: 'ADT23IODB504', name: 'Manoj Ghate', phone: '+91 98901 33004', boardingStop: 'Undri Phata', dept: 'Institute of Design', status: 'Pending', type: 'Student', attendance: 'Absent', time: '-' }
    ]
  },

  'bus-j': {
    id: 'bus-j',
    name: 'Bus J - Viman Nagar',
    corridor: 'Viman Nagar Dutta Mandir • MIT Campus Loni',
    origin: 'Viman Nagar',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '7:15 AM',
    arrival: '8:28 AM',
    time: '42 mins',
    enrolled: 43,
    cap: 49,
    bus: {
      plate: 'MH12-VN-6601',
      reg: 'Coach #10 • REG-1044',
      model: 'Tata Marcopolo 49 Seater Deluxe AC',
      capacity: '49 Seats (43 Enrolled)',
      owner: 'Tarawade Logistics Fleet',
      fuel: '79% Diesel',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till Apr 2027',
      odometer: '35,800 km'
    },
    driver: {
      name: 'Ankush Shinde',
      photo: 'assets/driver-ankush.jpg',
      phone: '+91 98901 44102',
      empId: 'MIT-DRV-106',
      license: 'MH12-2016-DL66301',
      duty: 'On Duty',
      attendance: '99% (28/28 Days)',
      exp: '6.1 Years',
      rating: '5.0 / 5.0'
    },
    stops: [
      { number: 1, name: 'Viman Nagar Dutta Mandir', lat: 18.5680, lng: 73.9150, time: '7:15 AM', distance: '0.0 km', boardingCount: 14 },
      { number: 2, name: 'Clover Park', lat: 18.5620, lng: 73.9180, time: '7:22 AM', distance: '1.5 km', boardingCount: 8 },
      { number: 3, name: 'Kharadi Bypass', lat: 18.5520, lng: 73.9450, time: '7:35 AM', distance: '5.1 km', boardingCount: 9 },
      { number: 4, name: 'EON Free Zone', lat: 18.5540, lng: 73.9610, time: '7:48 AM', distance: '7.8 km', boardingCount: 7 },
      { number: 5, name: 'Wagholi Phata', lat: 18.5790, lng: 73.9850, time: '8:05 AM', distance: '13.2 km', boardingCount: 5 },
      { number: 6, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:28 AM', distance: '24.5 km', boardingCount: 0 }
    ],
    passengers: [
      { rollNo: 'ADT23IODB601', name: 'Simran Walia', phone: '+91 98450 66001', boardingStop: 'Viman Nagar Dutta Mandir', dept: 'Institute of Design', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:17 AM' },
      { rollNo: 'ADT23FAC012', name: 'Prof. Rajiv Mehta', phone: '+91 98450 66002', boardingStop: 'Clover Park', dept: 'College of Management', status: 'Paid', type: 'Faculty', attendance: 'Present', time: '7:25 AM' },
      { rollNo: 'ADT23IODB603', name: 'Devendra Patil', phone: '+91 98450 66003', boardingStop: 'Kharadi Bypass', dept: 'School of Engineering', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:38 AM' },
      { rollNo: 'ADT23IODB604', name: 'Aakash Singhania', phone: '+91 98450 66004', boardingStop: 'EON Free Zone', dept: 'School of Design', status: 'Paid', type: 'Student', attendance: 'Absent', time: '-' }
    ]
  },

  'bus-k': {
    id: 'bus-k',
    name: 'Bus K - Hinjawadi',
    corridor: 'Hinjawadi Phase 1 • MIT Campus Loni',
    origin: 'Hinjawadi Shivaji Chowk',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '6:30 AM',
    arrival: '8:30 AM',
    time: '70 mins',
    enrolled: 45,
    cap: 49,
    bus: {
      plate: 'MH12-HJ-9904',
      reg: 'Coach #11 • REG-1155',
      model: 'Ashok Leyland 49 Deluxe High-Deck',
      capacity: '49 Seats (45 Enrolled)',
      owner: 'Tarawade Logistics Fleet',
      fuel: '89% Diesel',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till May 2027',
      odometer: '48,100 km'
    },
    driver: {
      name: 'Kishor Chavan',
      photo: 'assets/driver-kishor.jpg',
      phone: '+91 98450 44102',
      empId: 'MIT-DRV-108',
      license: 'MH12-2019-DL22019',
      duty: 'On Duty',
      attendance: '98% (27/28 Days)',
      exp: '5.5 Years',
      rating: '4.9 / 5.0'
    },
    stops: [
      { number: 1, name: 'Hinjawadi Shivaji Chowk', lat: 18.5910, lng: 73.7380, time: '6:30 AM', distance: '0.0 km', boardingCount: 15 },
      { number: 2, name: 'Wakad Bridge', lat: 18.5980, lng: 73.7650, time: '6:45 AM', distance: '3.8 km', boardingCount: 8 },
      { number: 3, name: 'Jagtap Dairy', lat: 18.5950, lng: 73.7920, time: '7:00 AM', distance: '7.2 km', boardingCount: 6 },
      { number: 4, name: 'Aundh Ravet Road', lat: 18.5620, lng: 73.8080, time: '7:18 AM', distance: '12.4 km', boardingCount: 6 },
      { number: 5, name: 'University Circle', lat: 18.5520, lng: 73.8260, time: '7:35 AM', distance: '16.9 km', boardingCount: 5 },
      { number: 6, name: 'Pune Railway Station', lat: 18.5280, lng: 73.8740, time: '7:55 AM', distance: '23.8 km', boardingCount: 5 },
      { number: 7, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:30 AM', distance: '41.2 km', boardingCount: 0 }
    ],
    passengers: [
      { rollNo: 'ADT23IODB701', name: 'Nikhil Rane', phone: '+91 98902 77001', boardingStop: 'Hinjawadi Shivaji Chowk', dept: 'School of Design', status: 'Paid', type: 'Student', attendance: 'Present', time: '6:33 AM' },
      { rollNo: 'ADT23FAC013', name: 'Dr. Pallavi Gore', phone: '+91 98902 77002', boardingStop: 'Wakad Bridge', dept: 'Institute of Design', status: 'Paid', type: 'Faculty', attendance: 'Present', time: '6:49 AM' },
      { rollNo: 'ADT23IODB703', name: 'Sagar Deshpande', phone: '+91 98902 77003', boardingStop: 'Jagtap Dairy', dept: 'School of Engineering', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:04 AM' },
      { rollNo: 'ADT23IODB704', name: 'Pranita Salve', phone: '+91 98902 77004', boardingStop: 'Aundh Ravet Road', dept: 'College of Management', status: 'Pending', type: 'Student', attendance: 'Absent', time: '-' }
    ]
  },

  'bus-l': {
    id: 'bus-l',
    name: 'Bus L - Magarpatta',
    corridor: 'Magarpatta DC • MIT Campus Loni',
    origin: 'Magarpatta DC',
    dest: 'MIT Campus Loni',
    status: 'active',
    departure: '7:25 AM',
    arrival: '8:25 AM',
    time: '35 mins',
    enrolled: 36,
    cap: 49,
    bus: {
      plate: 'MH12-MG-1150',
      reg: 'Coach #12 • REG-1266',
      model: 'Tata Starbus Ultra 49 AC Deluxe',
      capacity: '49 Seats (36 Enrolled)',
      owner: 'MIT ADT University Owned',
      fuel: '94% CNG Clean',
      status: 'Operational',
      governor: '60 km/h Strict Limit',
      fitness: 'Valid till Jun 2027',
      odometer: '21,500 km'
    },
    driver: {
      name: 'Baban Gaikwad',
      photo: 'assets/driver-baban.jpg',
      phone: '+91 98223 11802',
      empId: 'MIT-DRV-107',
      license: 'MH12-2015-DL88109',
      duty: 'On Duty',
      attendance: '94% (25/28 Days)',
      exp: '3.8 Years',
      rating: '4.8 / 5.0'
    },
    stops: [
      { number: 1, name: 'Magarpatta Destination Center', lat: 18.5160, lng: 73.9310, time: '7:25 AM', distance: '0.0 km', boardingCount: 11 },
      { number: 2, name: 'Seasons Mall North', lat: 18.5200, lng: 73.9350, time: '7:35 AM', distance: '1.2 km', boardingCount: 8 },
      { number: 3, name: 'Mundhwa Flyover', lat: 18.5290, lng: 73.9420, time: '7:48 AM', distance: '3.9 km', boardingCount: 6 },
      { number: 4, name: 'Amanora Town Gateway', lat: 18.5170, lng: 73.9490, time: '7:58 AM', distance: '6.2 km', boardingCount: 6 },
      { number: 5, name: 'Uruli Kanchan Road', lat: 18.5020, lng: 73.9850, time: '8:12 AM', distance: '12.8 km', boardingCount: 5 },
      { number: 6, name: 'MIT Campus Loni', lat: 18.4908, lng: 74.0255, time: '8:25 AM', distance: '19.4 km', boardingCount: 0 }
    ],
    passengers: [
      { rollNo: 'ADT23IODB801', name: 'Rohan Deshpande', phone: '+91 98903 88001', boardingStop: 'Magarpatta Destination Center', dept: 'Institute of Design', status: 'Paid', type: 'Student', attendance: 'Present', time: '7:27 AM' },
      { rollNo: 'ADT23FAC014', name: 'Dr. Ketan Merchant', phone: '+91 98903 88002', boardingStop: 'Seasons Mall North', dept: 'School of Design', status: 'Paid', type: 'Faculty', attendance: 'Present', time: '7:39 AM' },
      { rollNo: 'ADT23IODB803', name: 'Ankita Gadgil', phone: '+91 98903 88003', boardingStop: 'Amanora Town Gateway', dept: 'College of Management', status: 'Paid', type: 'Student', attendance: 'Present', time: '8:01 AM' },
      { rollNo: 'ADT23IODB804', name: 'Omkar Naik', phone: '+91 98903 88004', boardingStop: 'Mundhwa Flyover', dept: 'School of Engineering', status: 'Paid', type: 'Student', attendance: 'Absent', time: '-' }
    ]
  }
};

// Route Coordinates: Lohegaon Bus Stop -> MIT Campus Loni (Legacy reference)
const BUS_E_COORDS = BUS_ROUTES_DETAILED['bus-e'].stops;

// Routes Dataset Summary Directory (12 Corridors)
const ROUTES_DATA = [
  { id: 'bus-a', name: 'Bus A - Nigdi', origin: 'Nigdi', dest: 'MIT Campus Loni', stops: 9, time: '45 mins', bus: 'MH12-CD-5678', enrolled: 28, cap: 49, status: 'active', driver: 'Santosh Jadhav' },
  { id: 'bus-b', name: 'Bus B - Chaphekar Chowk', origin: 'Chaphekar', dest: 'MIT Campus Loni', stops: 10, time: '55 mins', bus: 'MH12-EF-9012', enrolled: 26, cap: 49, status: 'active', driver: 'Vijay Kumar' },
  { id: 'bus-c', name: 'Bus C - Sane Chowk', origin: 'Sane Chowk', dest: 'MIT Campus Loni', stops: 5, time: 'Under maintenance', bus: 'MH12-GH-1122', enrolled: 0, cap: 49, status: 'maintenance', driver: 'Prakash Jagtap' },
  { id: 'bus-d', name: 'Bus D - Moshi', origin: 'Moshi', dest: 'MIT Campus Loni', stops: 10, time: '40 mins', bus: 'MH12-IJ-3344', enrolled: 34, cap: 49, status: 'active', driver: 'Ramesh Shinde' },
  { id: 'bus-e', name: 'Bus E - Lohegaon', origin: 'Lohegaon', dest: 'MIT Campus Loni', stops: 11, time: '50 mins', bus: 'MH12-AB-1234', enrolled: 39, cap: 49, status: 'active', driver: 'Arun Patil' },
  { id: 'bus-f', name: 'Bus F - Pashan', origin: 'Pashan', dest: 'MIT Campus Loni', stops: 10, time: '60 mins', bus: 'MH12-KL-5566', enrolled: 30, cap: 49, status: 'active', driver: 'Sanjay Deshmukh' },
  { id: 'bus-g', name: 'Bus G - Hadapsar', origin: 'Hadapsar', dest: 'MIT Campus Loni', stops: 7, time: '45 mins', bus: 'MH12-GH-8812', enrolled: 44, cap: 49, status: 'active', driver: 'Tanaji More' },
  { id: 'bus-h', name: 'Bus H - Kothrud', origin: 'Kothrud Stand', dest: 'MIT Campus Loni', stops: 7, time: '55 mins', bus: 'MH12-KH-7721', enrolled: 41, cap: 49, status: 'active', driver: 'Sambhaji Kadam' },
  { id: 'bus-i', name: 'Bus I - Katraj', origin: 'Katraj Bus Depot', dest: 'MIT Campus Loni', stops: 6, time: '50 mins', bus: 'MH12-KT-3390', enrolled: 38, cap: 49, status: 'active', driver: 'Chandrakant Mane' },
  { id: 'bus-j', name: 'Bus J - Viman Nagar', origin: 'Viman Nagar', dest: 'MIT Campus Loni', stops: 6, time: '42 mins', bus: 'MH12-VN-6601', enrolled: 43, cap: 49, status: 'active', driver: 'Ankush Shinde' },
  { id: 'bus-k', name: 'Bus K - Hinjawadi', origin: 'Hinjawadi', dest: 'MIT Campus Loni', stops: 7, time: '70 mins', bus: 'MH12-HJ-9904', enrolled: 45, cap: 49, status: 'active', driver: 'Kishor Chavan' },
  { id: 'bus-l', name: 'Bus L - Magarpatta', origin: 'Magarpatta DC', dest: 'MIT Campus Loni', stops: 6, time: '35 mins', bus: 'MH12-MG-1150', enrolled: 36, cap: 49, status: 'active', driver: 'Baban Gaikwad' }
];

// Master Passengers Dataset
const PASSENGERS_DATA = [
  { 
    id: 'ADT23IODB009', 
    name: 'Priya Deshmukh', 
    type: 'Student', 
    department: 'Institute of Design (IOD)', 
    year: '3rd Year • B.Des Product', 
    busId: 'MH12-AB-1234', 
    route: 'Bus E - Lohegaon', 
    boardingStop: 'Lohegaon Octroi Post', 
    feeStatus: 'Paid', 
    passStatus: 'Collected',
    phone: '+91 98220 11492',
    passNo: 'SP-2026-9041',
    validUntil: '30 Jun 2026',
    attendancePct: 96,
    attendanceDays: '27/28 Days'
  },
  { 
    id: 'ADT23SOE012', 
    name: 'Rohan Kulkarni', 
    type: 'Student', 
    department: 'School of Engineering (SOE)', 
    year: '2nd Year • B.Tech Mechanical', 
    busId: 'MH12-AB-1234', 
    route: 'Bus E - Lohegaon', 
    boardingStop: 'Chandan Nagar Water Tank', 
    feeStatus: 'Pending', 
    passStatus: 'Collected',
    phone: '+91 98902 44319',
    passNo: 'SP-2026-9042',
    validUntil: '30 Jun 2026',
    attendancePct: 89,
    attendanceDays: '25/28 Days'
  },
  { 
    id: 'ADT23IODB045', 
    name: 'Sneha Patil', 
    type: 'Student', 
    department: 'Institute of Design (IOD)', 
    year: '4th Year • B.Des Graphic', 
    busId: 'MH12-EF-9012', 
    route: 'Bus B - Chaphekar', 
    boardingStop: 'Chaphekar Chowk', 
    feeStatus: 'Overdue', 
    passStatus: 'Not collected',
    phone: '+91 99220 88712',
    passNo: 'SP-2026-9043',
    validUntil: '30 Jun 2026',
    attendancePct: 64,
    attendanceDays: '18/28 Days'
  },
  { 
    id: 'ADT23SOE088', 
    name: 'Arjun Sharma', 
    type: 'Student', 
    department: 'School of Engineering (SOE)', 
    year: '1st Year • B.Tech Computer', 
    busId: 'MH12-CD-5678', 
    route: 'Bus A - Nigdi', 
    boardingStop: 'Nigdi Pradhikaran', 
    feeStatus: 'Paid', 
    passStatus: 'Collected',
    phone: '+91 98450 77123',
    passNo: 'SP-2026-9044',
    validUntil: '30 Jun 2026',
    attendancePct: 96,
    attendanceDays: '27/28 Days'
  },
  { 
    id: 'ADT23COM104', 
    name: 'Tanya Mehra', 
    type: 'Student', 
    department: 'College of Management (COM)', 
    year: '2nd Year • MBA Marketing', 
    busId: 'MH12-IJ-3344', 
    route: 'Bus D - Moshi', 
    boardingStop: 'Bhosari Landewadi', 
    feeStatus: 'Paid', 
    passStatus: 'Collected',
    phone: '+91 97654 33211',
    passNo: 'SP-2026-9045',
    validUntil: '30 Jun 2026',
    attendancePct: 93,
    attendanceDays: '26/28 Days'
  },
  { 
    id: 'ADT23SOC112', 
    name: 'Vikhyat Kaushik', 
    type: 'Student', 
    department: 'School of Computing (SOC)', 
    year: '3rd Year • B.Tech AI & Data Science', 
    busId: 'MH12-CD-5678', 
    route: 'Bus A - Nigdi', 
    boardingStop: 'Akurdi Railway Station', 
    feeStatus: 'Paid', 
    passStatus: 'Collected',
    phone: '+91 98234 88710',
    passNo: 'SP-2026-9046',
    validUntil: '30 Jun 2026',
    attendancePct: 96,
    attendanceDays: '27/28 Days'
  },
  { 
    id: 'ADT23FAC001', 
    name: 'Dr. Sarah Miller', 
    type: 'Faculty', 
    department: 'Institute of Design (IOD)', 
    year: 'HOD • Industrial Design', 
    busId: 'MH12-AB-1234', 
    route: 'Bus E - Lohegaon', 
    boardingStop: 'Viman Nagar Symbiosis Chowk', 
    feeStatus: 'Paid', 
    passStatus: 'Collected',
    phone: '+91 98450 22391',
    passNo: 'FP-2026-1002',
    validUntil: '31 Dec 2026',
    attendancePct: 96,
    attendanceDays: '27/28 Days'
  },
  { 
    id: 'ADT23BIO210', 
    name: 'Aditya Rao', 
    type: 'Student', 
    department: 'School of Bioengineering', 
    year: '4th Year • B.Tech Biotech', 
    busId: 'MH12-KL-5566', 
    route: 'Bus F - Pashan', 
    boardingStop: 'Pashan Circle', 
    feeStatus: 'Paid', 
    passStatus: 'Not collected',
    phone: '+91 98901 33452',
    passNo: 'SP-2026-9047',
    validUntil: '30 Jun 2026',
    attendancePct: 79,
    attendanceDays: '22/28 Days'
  },
  { 
    id: 'ADT23ARC019', 
    name: 'Isha Kulkarni', 
    type: 'Student', 
    department: 'College of Architecture (SOA)', 
    year: '2nd Year • B.Arch', 
    busId: 'MH12-EF-9012', 
    route: 'Bus B - Chaphekar', 
    boardingStop: 'Baner Phata', 
    feeStatus: 'Paid', 
    passStatus: 'Collected',
    phone: '+91 98453 66720',
    passNo: 'SP-2026-9048',
    validUntil: '30 Jun 2026',
    attendancePct: 93,
    attendanceDays: '26/28 Days'
  },
  { 
    id: 'ADT23FTI055', 
    name: 'Sameer Joshi', 
    type: 'Student', 
    department: 'Film & Television Institute (FTI)', 
    year: '3rd Year • Cinematography', 
    busId: 'MH12-MN-7788', 
    route: 'Bus C - Kothrud', 
    boardingStop: 'Kothrud Stand', 
    feeStatus: 'Pending', 
    passStatus: 'Not collected',
    phone: '+91 98221 44556',
    passNo: 'SP-2026-9049',
    validUntil: '30 Jun 2026',
    attendancePct: 75,
    attendanceDays: '21/28 Days'
  },
  { 
    id: 'ADT23FAC014', 
    name: 'Prof. Ramesh Kadam', 
    type: 'Faculty', 
    department: 'School of Engineering (SOE)', 
    year: 'Dean Academics • Civil Eng', 
    busId: 'MH12-MN-7788', 
    route: 'Bus C - Kothrud', 
    boardingStop: 'Paud Road Vanaz Corner', 
    feeStatus: 'Paid', 
    passStatus: 'Collected',
    phone: '+91 98220 99887',
    passNo: 'FP-2026-1008',
    validUntil: '31 Dec 2026',
    attendancePct: 96,
    attendanceDays: '27/28 Days'
  },
  { 
    id: 'ADT23SFA022', 
    name: 'Ananya Verma', 
    type: 'Student', 
    department: 'School of Fine Arts (SFA)', 
    year: '1st Year • BFA Applied Arts', 
    busId: 'MH12-OP-9900', 
    route: 'Bus G - Hadapsar', 
    boardingStop: 'Magarpatta South Gate', 
    feeStatus: 'Overdue', 
    passStatus: 'Not collected',
    phone: '+91 97660 33214',
    passNo: 'SP-2026-9050',
    validUntil: '30 Jun 2026',
    attendancePct: 61,
    attendanceDays: '17/28 Days'
  },
  { 
    id: 'ADT23SOC044', 
    name: 'Gaurav Shinde', 
    type: 'Student', 
    department: 'School of Computing (SOC)', 
    year: '3rd Year • Cybersecurity', 
    busId: 'MH12-EF-9012', 
    route: 'Bus B - Chaphekar', 
    boardingStop: 'Hinjewadi Flyover', 
    feeStatus: 'Paid', 
    passStatus: 'Collected',
    phone: '+91 98904 33210',
    passNo: 'SP-2026-9051',
    validUntil: '30 Jun 2026',
    attendancePct: 96,
    attendanceDays: '27/28 Days'
  },
  { 
    id: 'ADT23SOE167', 
    name: 'Swati Bhosale', 
    type: 'Student', 
    department: 'School of Engineering (SOE)', 
    year: '4th Year • Civil Eng', 
    busId: 'MH12-EF-9012', 
    route: 'Bus B - Chaphekar', 
    boardingStop: 'Shivajinagar Stn', 
    feeStatus: 'Paid', 
    passStatus: 'Collected',
    phone: '+91 97660 11482',
    passNo: 'SP-2026-9052',
    validUntil: '30 Jun 2026',
    attendancePct: 93,
    attendanceDays: '26/28 Days'
  },
  { 
    id: 'ADT23FAC022', 
    name: 'Dr. Anand Dighe', 
    type: 'Faculty', 
    department: 'College of Management (COM)', 
    year: 'Professor • Finance & Banking', 
    busId: 'MH12-CD-5678', 
    route: 'Bus A - Nigdi', 
    boardingStop: 'Chinchwad Station', 
    feeStatus: 'Paid', 
    passStatus: 'Collected',
    phone: '+91 98810 55443',
    passNo: 'FP-2026-1015',
    validUntil: '31 Dec 2026',
    attendancePct: 96,
    attendanceDays: '27/28 Days'
  },
  { 
    id: 'ADT23BIO031', 
    name: 'Kavita Nair', 
    type: 'Student', 
    department: 'School of Bioengineering', 
    year: '2nd Year • M.Tech Bioinformatics', 
    busId: 'MH12-KL-5566', 
    route: 'Bus F - Pashan', 
    boardingStop: 'Baner Balewadi Phata', 
    feeStatus: 'Pending', 
    passStatus: 'Not collected',
    phone: '+91 97652 44109',
    passNo: 'SP-2026-9053',
    validUntil: '30 Jun 2026',
    attendancePct: 82,
    attendanceDays: '23/28 Days'
  }
];

// =============================================================================
// LIVE BUS TRACKING & MOVEMENT ENGINE
// =============================================================================

class RouteBusTracker {
  constructor(options) {
    this.map = options.map;
    this.stops = options.stops || [];
    this.busLabel = options.busLabel || 'Bus E';
    this.markerId = options.markerId || 'trackerBus';
    this.onUpdate = options.onUpdate;
    this.onStopChange = options.onStopChange;

    this.legIndex = 0;
    this.progress = 0;
    this.stepSize = 0.012; // Smooth movement
    this.marker = null;
    this.intervalId = null;
    this.isPaused = false;
    this.pauseTicks = 0;

    this.initMarker();
    this.start();
  }

  initMarker() {
    if (!this.map || !this.stops.length) return;
    const firstStop = this.stops[0];

    const icon = L.divIcon({
      className: 'live-bus-marker-container',
      html: `
        <div class="live-bus-pulse"></div>
        <div class="live-bus-pin" id="pin_${this.markerId}">
          <i class="ph-bold ph-bus"></i>
        </div>
        <div class="live-bus-tag" id="tag_${this.markerId}">42 km/h</div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    this.marker = L.marker([firstStop.lat, firstStop.lng], { icon, zIndexOffset: 1200 }).addTo(this.map);
    this.marker.bindPopup(`<b>${this.busLabel} • Live GPS</b><br>Status: In Transit<br>Next Stop: ${this.stops[1]?.name || 'Next Waypoint'}`);
  }

  start() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.tick(), 65);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.marker && this.map) {
      this.map.removeLayer(this.marker);
      this.marker = null;
    }
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  toggle() {
    this.isPaused = !this.isPaused;
    return !this.isPaused;
  }

  tick() {
    if (this.isPaused || !this.stops || this.stops.length < 2) return;

    if (this.pauseTicks > 0) {
      this.pauseTicks--;
      return;
    }

    const currentP1 = this.stops[this.legIndex];
    const nextIndex = (this.legIndex + 1) % this.stops.length;
    const currentP2 = this.stops[nextIndex];

    this.progress += this.stepSize;

    if (this.progress >= 1) {
      this.progress = 0;
      this.legIndex = nextIndex;
      this.pauseTicks = 16; // Pause ~1 sec at stop simulating boarding
      if (this.onStopChange) {
        this.onStopChange(this.legIndex);
      }
    }

    const p1 = this.stops[this.legIndex];
    const p2 = this.stops[(this.legIndex + 1) % this.stops.length];

    const curLat = p1.lat + (p2.lat - p1.lat) * this.progress;
    const curLng = p1.lng + (p2.lng - p1.lng) * this.progress;

    if (this.marker) {
      this.marker.setLatLng([curLat, curLng]);

      // Calculate bearing angle
      const dLng = (p2.lng - p1.lng) * Math.cos(curLat * Math.PI / 180);
      const dLat = p2.lat - p1.lat;
      const angle = Math.atan2(dLng, dLat) * 180 / Math.PI;

      const pinEl = document.getElementById(`pin_${this.markerId}`);
      if (pinEl) {
        pinEl.style.transform = `rotate(${Math.round(angle)}deg)`;
      }

      // Realistic speed fluctuation
      const flucSpeed = Math.round(38 + Math.sin(Date.now() / 2000) * 6);
      const tagEl = document.getElementById(`tag_${this.markerId}`);
      if (tagEl) {
        tagEl.textContent = `${flucSpeed} km/h`;
      }

      if (this.onUpdate) {
        const remainingMinutes = Math.max(2, Math.round((1 - this.progress) * 6 + (this.stops.length - 1 - this.legIndex) * 3));
        this.onUpdate({
          speed: `${flucSpeed} km/h`,
          currentStop: p1.name,
          nextStop: p2.name,
          eta: `${remainingMinutes} mins`,
          legIndex: this.legIndex
        });
      }
    }
  }
}

// =============================================================================
// AUDIO CHIMES (WEB AUDIO API) - ONLY ON PROMINENT BUTTONS!
// =============================================================================

let audioCtx = null;

function playProminentSound(type = 'success') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx && AudioContext) {
      audioCtx = new AudioContext();
    }
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'alert') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(440, now + 0.1);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    // Graceful audio fallback
  }
}

// =============================================================================
// NAVIGATION & VIEW SWITCHING
// =============================================================================

function navigateTo(viewId) {
  AppState.currentView = viewId;

  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(`view-${viewId}`);
  if (target) target.classList.add('active');

  const viewport = document.querySelector('.app-main-viewport');
  if (viewport) {
    viewport.classList.toggle('chat-full-bleed', viewId === 'chat');
  }

  document.querySelectorAll('.sidebar-nav-item button').forEach(btn => {
    const targetAttr = btn.getAttribute('data-target');
    const isMatched = (targetAttr === viewId) || 
                      (viewId === 'route-detail' && targetAttr === 'routes') ||
                      (viewId === 'bus-detail' && targetAttr === 'buses') ||
                      (viewId === 'drivers' && targetAttr === 'drivers');
    btn.classList.toggle('active', isMatched);
  });

  if (viewId === 'dashboard') {
    if (!AppState.dashMap) {
      setTimeout(initDashboardMap, 60);
    } else {
      setTimeout(() => AppState.dashMap.invalidateSize(), 100);
    }
  } else if (viewId === 'route-detail' && AppState.routeDetailMap) {
    setTimeout(() => AppState.routeDetailMap.invalidateSize(), 100);
  } else if (viewId === 'drivers') {
    renderDedicatedDrivers();
  } else if (viewId === 'complaints') {
    renderComplaints();
    updateComplaintsKPIs();
  } else if (viewId === 'passengers') {
    renderPassengers();
    updatePassengersKPIs();
  } else if (viewId === 'settings') {
    closeSettingsSubpage();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================================================
// DASHBOARD HOME SPEC (EXACT SPEC MATCHING IMAGE 4 + LIVE MOVING BUS)
// =============================================================================

// =============================================================================
// DASHBOARD HOME SPEC (CALENDAR, 12-BUS GRID DROPDOWN, ATTENDANCE & NUMBERED PINS)
// =============================================================================

function openDashDatePicker() {
  const dateInput = document.getElementById('dashDateInput');
  if (dateInput) {
    if (typeof dateInput.showPicker === 'function') {
      try {
        dateInput.showPicker();
      } catch (e) {
        dateInput.focus();
      }
    } else {
      dateInput.focus();
    }
  }
}

function handleDashDateSelect(isoVal) {
  if (!isoVal) return;
  AppState.dashDate = isoVal;
  // Format as '15/10/2026'
  const parts = isoVal.split('-');
  if (parts.length === 3) {
    const formatted = `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
    AppState.dashDateFormatted = formatted;
    const dispEl = document.getElementById('dashCalendarDisplay');
    if (dispEl) dispEl.textContent = formatted;
    const noticeEl = document.getElementById('dashAttDateNotice');
    if (noticeEl) noticeEl.textContent = `Recorded on ${formatted}`;
  }
  
  const currentKey = AppState.busKeys[AppState.selectedBusIndex] || 'bus-e';
  updateDashboardRoute(currentKey);
  triggerToast(`Transit schedule & roll call loaded for ${AppState.dashDateFormatted}`, 'info');
}

function stepDashDate(deltaDays) {
  const curDate = new Date(AppState.dashDate || '2026-10-15');
  curDate.setDate(curDate.getDate() + deltaDays);
  const year = curDate.getFullYear();
  const month = String(curDate.getMonth() + 1).padStart(2, '0');
  const day = String(curDate.getDate()).padStart(2, '0');
  const newIso = `${year}-${month}-${day}`;
  
  const dateInput = document.getElementById('dashDateInput');
  if (dateInput) dateInput.value = newIso;
  handleDashDateSelect(newIso);
}

function toggleDashBusDropdown(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const menu = document.getElementById('dashBusDropdownMenu');
  const btn = document.getElementById('dashBusDropdownBtn');
  if (!menu) return;

  const isHidden = menu.classList.contains('hidden');
  if (isHidden) {
    renderDashBusDropdownOptions();
    menu.classList.remove('hidden');
    btn?.classList.add('open');
  } else {
    menu.classList.add('hidden');
    btn?.classList.remove('open');
  }
}

function renderDashBusDropdownOptions() {
  const menu = document.getElementById('dashBusDropdownMenu');
  if (!menu) return;

  const currentKey = AppState.busKeys[AppState.selectedBusIndex] || 'bus-e';

  let html = `
    <div class="dash-bus-dropdown-header">
      <span><i class="ph ph-van"></i> Select Transit Corridor (${AppState.busKeys.length} Fleet Routes)</span>
      <span class="badge-clean operational"><i class="ph ph-broadcast"></i> Live Fleet GPS</span>
    </div>
    <div class="dash-bus-grid">
  `;

  html += AppState.busKeys.map(key => {
    const route = BUS_ROUTES_DETAILED[key] || ROUTES_DATA.find(r => r.id === key);
    if (!route) return '';

    const isCurrent = key === currentKey;
    const busCode = route.name.split(' - ')[0] || key.toUpperCase();
    const corridor = route.name.split(' - ')[1] || route.origin;
    const isMaint = route.status === 'maintenance';

    return `
      <div class="dash-bus-grid-card ${isCurrent ? 'active' : ''}" onclick="selectDashboardBus('${key}')">
        <div class="dash-bus-grid-top">
          <span class="dash-bus-grid-code">
            <i class="ph ph-bus"></i> ${busCode}
          </span>
          <span class="badge-clean ${isMaint ? 'warning' : 'operational'}" style="font-size: 10px; padding: 2px 6px;">
            ${isMaint ? 'Maint.' : 'Active'}
          </span>
        </div>
        <div class="dash-bus-grid-corridor" title="${corridor}">${corridor}</div>
      </div>
    `;
  }).join('');

  html += `</div>`;
  menu.innerHTML = html;
}

function selectDashboardBus(routeKey) {
  const idx = AppState.busKeys.indexOf(routeKey);
  if (idx !== -1) {
    AppState.selectedBusIndex = idx;
  }
  AppState.currentRouteId = routeKey;

  const menu = document.getElementById('dashBusDropdownMenu');
  const btn = document.getElementById('dashBusDropdownBtn');
  if (menu) menu.classList.add('hidden');
  if (btn) btn.classList.remove('open');

  updateDashboardRoute(routeKey);
}

// Global click-outside listener to close bus selector dropdown
document.addEventListener('click', (e) => {
  const menu = document.getElementById('dashBusDropdownMenu');
  const btn = document.getElementById('dashBusDropdownBtn');
  if (menu && !menu.classList.contains('hidden')) {
    if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
      menu.classList.add('hidden');
      btn?.classList.remove('open');
    }
  }
});

function ensureRoutePassengerFields(route) {
  if (!route || !route.passengers) return;
  route.passengers.forEach((p, idx) => {
    if (!p.type) {
      p.type = (p.rollNo && p.rollNo.includes('FAC')) ? 'Faculty' : 'Student';
    }
    if (!p.attendance) {
      p.attendance = (idx % 7 === 3) ? 'Absent' : 'Present';
    }
    if (!p.time) {
      p.time = p.attendance === 'Present' ? `7:${(10 + (idx * 3) % 45).toString().padStart(2, '0')} AM` : '-';
    }
  });
}

function updateDashboardRoute(routeKey) {
  const route = BUS_ROUTES_DETAILED[routeKey] || BUS_ROUTES_DETAILED['bus-e'];
  ensureRoutePassengerFields(route);

  const labelEl = document.getElementById('dashSelectedBusLabel');
  if (labelEl) labelEl.textContent = route.name;

  const origName = document.getElementById('dashOriginBadgeName');
  const origTime = document.getElementById('dashOriginBadgeTime');
  const destName = document.getElementById('dashDestBadgeName');
  const destTime = document.getElementById('dashDestBadgeTime');

  if (origName) origName.textContent = route.origin;
  if (origTime) origTime.textContent = route.departure;
  if (destName) destName.textContent = route.dest;
  if (destTime) destTime.textContent = route.arrival;

  const busPill = document.getElementById('dashHudBusPill');
  if (busPill) busPill.textContent = `${route.name} • Moving`;

  // Update Left Panel Vehicle Specs & Structured Hierarchy
  const plateTitle = document.getElementById('dashBusPlateTitle');
  const modelSpec = document.getElementById('dashBusModelSpec');
  const driverAvatar = document.getElementById('dashBusDriverAvatar');
  const driverName = document.getElementById('dashBusDriverName');
  const routeSpec = document.getElementById('dashBusRouteSpec');
  const statusBadge = document.getElementById('dashBusStatusBadge');
  const capSpec = document.getElementById('dashBusCapSpec');
  const enrolledLoadSub = document.getElementById('dashBusEnrolledLoadSub');
  const schedSpec = document.getElementById('dashBusScheduleSpec');
  const regSub = document.getElementById('dashBusRegSub');
  const ownerSub = document.getElementById('dashBusOwnerSub');
  const fitnessSpec = document.getElementById('dashBusFitnessSpec');
  const liveSpeed = document.getElementById('dashBusLiveSpeed');
  const fuelLevel = document.getElementById('dashBusFuelLevel');

  const enrolledCount = route.passengers ? route.passengers.length : (route.enrolled || 39);
  const capVal = route.cap || 49;
  const isMaint = route.status === 'maintenance';

  if (plateTitle) plateTitle.textContent = route.bus?.plate || 'MH 12 AB 1234';
  if (modelSpec) modelSpec.textContent = route.bus?.model || 'Tata Starbus Ultra • 49-Seater Luxury AC Coach';
  if (driverAvatar && route.driver?.photo) driverAvatar.src = route.driver.photo;
  if (driverName && route.driver?.name) driverName.textContent = route.driver.name;
  if (routeSpec) routeSpec.textContent = route.corridor || `${route.origin} Express Corridor`;
  if (statusBadge) {
    statusBadge.className = `badge-clean ${isMaint ? 'warning' : 'operational'}`;
    statusBadge.innerHTML = `<span class="status-dot ${isMaint ? 'amber' : 'green'}"></span> ${isMaint ? 'Maintenance' : 'Active on Route'}`;
  }
  if (capSpec) capSpec.textContent = `${capVal} Seats`;
  if (enrolledLoadSub) enrolledLoadSub.textContent = `${enrolledCount} Enrolled (${((enrolledCount / capVal) * 100).toFixed(0)}% Load)`;
  if (schedSpec) schedSpec.textContent = `${route.departure || '6:55 AM'} – ${route.arrival || '8:30 AM'}`;
  if (regSub) regSub.textContent = route.bus?.reg || 'REG-5678';
  if (fitnessSpec) fitnessSpec.textContent = route.bus?.lastService || '28 Feb, 2026';
  const serviceSub = document.getElementById('dashBusServiceSub');
  if (serviceSub) serviceSub.textContent = 'Last Serviced Date';
  if (liveSpeed) liveSpeed.textContent = route.speed || '36 km/h';
  if (fuelLevel) fuelLevel.textContent = route.bus?.fuel || '82% Diesel';

  // Update Attendance Subtab calculations & list
  updateDashboardAttendance(route);

  // Update Right Column sequential stops list to match selected route with numbered circles
  const rightStopsHeader = document.querySelector('.route-stops-card .route-card-title span');
  if (rightStopsHeader) rightStopsHeader.textContent = route.origin.split(' ')[0] || route.origin;

  const stopsFlowContainer = document.querySelector('.stops-2col-flow');
  if (stopsFlowContainer && route.stops) {
    const half = Math.ceil(route.stops.length / 2);
    const col1 = route.stops.slice(0, half);
    const col2 = route.stops.slice(half);

    const renderCol = (list) => list.map(s => `
      <div class="stop-flow-node">
        <div class="stop-num-circle">${s.number}</div>
        <div class="stop-meta">
          <span class="stop-node-name">${s.name}</span>
          <span class="stop-node-time">${s.time}</span>
        </div>
      </div>
    `).join('');

    stopsFlowContainer.innerHTML = `
      <div class="stops-col-list">${renderCol(col1)}</div>
      <div class="stops-col-list">${renderCol(col2)}</div>
    `;
  }

  // Update Leaflet map with Numbered Circle Drop Points on the route!
  if (AppState.dashMap) {
    if (AppState.dashPolyline) AppState.dashMap.removeLayer(AppState.dashPolyline);
    if (AppState.dashMarkersLayer) AppState.dashMap.removeLayer(AppState.dashMarkersLayer);
    if (AppState.dashBusTracker) AppState.dashBusTracker.stop();

    const latLngs = route.stops.map(s => [s.lat, s.lng]);
    AppState.dashPolyline = L.polyline(latLngs, {
      color: '#FF5E00',
      weight: 4,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(AppState.dashMap);

    AppState.dashMarkersLayer = L.layerGroup();
    route.stops.forEach((s, idx) => {
      const isTerminus = idx === 0 || idx === route.stops.length - 1;
      const numberIcon = L.divIcon({
        className: 'custom-map-stop-pin',
        html: `<div class="dash-map-stop-circle ${isTerminus ? 'terminus' : ''}">${s.number}</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      L.marker([s.lat, s.lng], { icon: numberIcon })
        .addTo(AppState.dashMarkersLayer)
        .bindPopup(`<b>Stop #${s.number}: ${s.name}</b><br>${s.time} • ${s.boardingCount || 0} Boarding`);
    });
    AppState.dashMarkersLayer.addTo(AppState.dashMap);

    AppState.dashMap.fitBounds(AppState.dashPolyline.getBounds(), { padding: [30, 30] });

    AppState.dashBusTracker = new RouteBusTracker({
      map: AppState.dashMap,
      stops: route.stops,
      busLabel: route.name,
      markerId: 'homeBus',
      onUpdate: (data) => {
        const spd = document.getElementById('dashHudSpeed');
        const nxt = document.getElementById('dashHudNextStop');
        const eta = document.getElementById('dashHudEta');
        if (spd) spd.textContent = data.speed;
        if (nxt) nxt.textContent = data.nextStop;
        if (eta) eta.textContent = data.eta;

        const homeStopNodes = document.querySelectorAll('.stops-2col-flow .stop-flow-node');
        homeStopNodes.forEach((node, idx) => {
          if (idx === data.legIndex + 1) {
            node.classList.add('active-approaching-stop');
            node.classList.remove('passed-stop');
          } else if (idx <= data.legIndex) {
            node.classList.add('passed-stop');
            node.classList.remove('active-approaching-stop');
          } else {
            node.classList.remove('active-approaching-stop', 'passed-stop');
          }
        });
      }
    });
  }

  triggerToast(`Switched tracking to ${route.name}`, 'info');
}

function updateDashboardAttendance(route) {
  if (!route) return;

  const passengers = route.passengers || [];
  const totalCapacity = route.cap || 49;
  const enrolledCount = passengers.length;

  const students = passengers.filter(p => p.type === 'Student' || !p.rollNo.includes('FAC'));
  const faculty = passengers.filter(p => p.type === 'Faculty' || p.rollNo.includes('FAC'));

  const studentsPresent = students.filter(s => s.attendance === 'Present').length;
  const studentsAbsent = students.length - studentsPresent;
  const studentRate = students.length > 0 ? ((studentsPresent / students.length) * 100).toFixed(1) : '100.0';

  const facultyPresent = faculty.filter(f => f.attendance === 'Present').length;
  const facultyAbsent = faculty.length - facultyPresent;
  const facultyRate = faculty.length > 0 ? ((facultyPresent / faculty.length) * 100).toFixed(1) : '100.0';

  const totalPresent = studentsPresent + facultyPresent;
  const totalAbsent = studentsAbsent + facultyAbsent;
  const overallRate = enrolledCount > 0 ? ((totalPresent / enrolledCount) * 100).toFixed(1) : '0.0';

  // Update Primary KPI Cards
  const totalStrEl = document.getElementById('dashAttTotalStrength');
  const enrolledSubEl = document.getElementById('dashAttEnrolledSub');
  const strengthBarEl = document.getElementById('dashAttStrengthBar');
  const vacantSeatsEl = document.getElementById('dashAttVacantSeats');
  const capPct = ((enrolledCount / totalCapacity) * 100).toFixed(1);

  if (totalStrEl) totalStrEl.textContent = `${totalCapacity} Seats`;
  if (enrolledSubEl) enrolledSubEl.textContent = `${enrolledCount} Enrolled (${capPct}% Cap)`;
  if (strengthBarEl) strengthBarEl.style.width = `${Math.min(100, capPct)}%`;
  if (vacantSeatsEl) vacantSeatsEl.textContent = `${Math.max(0, totalCapacity - enrolledCount)} Available Empty Seats`;

  const stdRateEl = document.getElementById('dashAttStudentRate');
  const stdPresEl = document.getElementById('dashAttStudentsPresent');
  const stdAbsEl = document.getElementById('dashAttStudentsAbsent');
  const stdTotEl = document.getElementById('dashAttStudentsTotal');
  const stdBarEl = document.getElementById('dashAttStudentBar');
  if (stdRateEl) stdRateEl.textContent = `${studentRate}%`;
  if (stdPresEl) stdPresEl.textContent = studentsPresent;
  if (stdAbsEl) stdAbsEl.textContent = studentsAbsent;
  if (stdTotEl) stdTotEl.textContent = `${students.length} Total Students`;
  if (stdBarEl) stdBarEl.style.width = `${studentRate}%`;

  const facRateEl = document.getElementById('dashAttFacultyRate');
  const facPresEl = document.getElementById('dashAttFacultyPresent');
  const facAbsEl = document.getElementById('dashAttFacultyAbsent');
  const facTotEl = document.getElementById('dashAttFacultyTotal');
  const facBarEl = document.getElementById('dashAttFacultyBar');
  if (facRateEl) facRateEl.textContent = `${facultyRate}%`;
  if (facPresEl) facPresEl.textContent = facultyPresent;
  if (facAbsEl) facAbsEl.textContent = facultyAbsent;
  if (facTotEl) facTotEl.textContent = `${faculty.length} Total Faculty`;
  if (facBarEl) facBarEl.style.width = `${facultyRate}%`;

  // Update Progress Meter & Bus Today's Attendance Cards
  const sumBadge = document.getElementById('dashBusAttSummaryBadge');
  if (sumBadge) sumBadge.textContent = `${overallRate}%`;

  const bStdPres = document.getElementById('dashBusAttStudentsPresent');
  if (bStdPres) bStdPres.textContent = studentsPresent;
  const bStdAbs = document.getElementById('dashBusAttStudentsAbsent');
  if (bStdAbs) bStdAbs.textContent = studentsAbsent;

  const bFacPres = document.getElementById('dashBusAttFacultyPresent');
  if (bFacPres) bFacPres.textContent = facultyPresent;
  const bFacAbs = document.getElementById('dashBusAttFacultyAbsent');
  if (bFacAbs) bFacAbs.textContent = facultyAbsent;

  const bTotPres = document.getElementById('dashBusAttTotalPresent');
  if (bTotPres) bTotPres.textContent = `${totalPresent} Present`;
  const bTotStr = document.getElementById('dashBusAttTotalStrength');
  if (bTotStr) bTotStr.textContent = `${enrolledCount} Enrolled`;

  const overallEl = document.getElementById('dashBusAttOverallRate');
  if (overallEl) overallEl.textContent = '';
  const attStdVal = document.getElementById('dashBusAttStudentsVal');
  if (attStdVal) attStdVal.innerHTML = `<strong>${studentsPresent}</strong> Present • ${studentsAbsent} Absent`;
  const attFacVal = document.getElementById('dashBusAttFacultyVal');
  if (attFacVal) attFacVal.innerHTML = `<strong>${facultyPresent}</strong> Present • ${facultyAbsent} Absent`;
  const attStrVal = document.getElementById('dashBusAttStrengthVal');
  if (attStrVal) attStrVal.innerHTML = `<strong>${enrolledCount}</strong> Enrolled / ${totalCapacity} Seats`;

  const progLabel = document.getElementById('dashAttProgressLabel');
  if (progLabel) {
    progLabel.innerHTML = `<i class="ph ph-check-circle" style="color: var(--accent);"></i> Daily Roll Call: <strong>${totalPresent} / ${enrolledCount} Present (${overallRate}%)</strong>`;
  }

  const dateNotice = document.getElementById('dashAttDateNotice');
  if (dateNotice) {
    dateNotice.textContent = `Recorded on ${AppState.dashDateFormatted || '15/10/2026'}`;
  }

  const barStd = document.getElementById('dashAttBarStudents');
  const barFac = document.getElementById('dashAttBarFaculty');
  const barAbs = document.getElementById('dashAttBarAbsent');
  if (enrolledCount > 0) {
    if (barStd) barStd.style.width = `${(studentsPresent / enrolledCount) * 100}%`;
    if (barFac) barFac.style.width = `${(facultyPresent / enrolledCount) * 100}%`;
    if (barAbs) barAbs.style.width = `${(totalAbsent / enrolledCount) * 100}%`;
  }

  // Populate Stop-Wise Boarding Statistics (NO Student Names, Pure Aggregate Stats)
  const stopsCountBadge = document.getElementById('dashAttStopsCountBadge');
  if (stopsCountBadge && route.stops) {
    stopsCountBadge.textContent = `${route.stops.length} Stops`;
  }

  const stopsTable = document.getElementById('dashAttStopsStatTable');
  if (stopsTable && route.stops) {
    stopsTable.innerHTML = route.stops.map((s, idx) => {
      // Calculate realistic boarding stats per stop for this corridor
      const expected = s.boardingCount || (idx === route.stops.length - 1 ? 0 : 3);
      const absChance = (idx === 1 || idx === 3) ? (studentsAbsent > 0 ? 1 : 0) : 0;
      const boarded = Math.max(0, expected - absChance);
      const pct = expected > 0 ? Math.round((boarded / expected) * 100) : 100;
      const isComplete = pct === 100;

      return `
        <div class="att-stop-stat-row">
          <div class="att-stop-stat-left">
            <span class="att-stop-num-mini">${s.number}</span>
            <span class="att-stop-name-text">${s.name}</span>
            <span class="att-stop-time-text">${s.time}</span>
          </div>
          <div class="att-stop-stat-right">
            <span class="att-stop-fraction">${boarded} / ${expected}</span>
            <span class="badge-clean ${isComplete ? 'operational' : 'warning'}" style="font-size: 10px; padding: 1px 6px;">
              ${pct}%
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Update Verification & Compliance Metrics
  const rfidCount = Math.max(0, totalPresent - (totalPresent > 15 ? 2 : 1));
  const rfidRate = totalPresent > 0 ? ((rfidCount / totalPresent) * 100).toFixed(1) : '100.0';
  const manualCount = totalPresent - rfidCount;
  const manualRate = totalPresent > 0 ? ((manualCount / totalPresent) * 100).toFixed(1) : '0.0';

  const excusedCount = Math.max(0, Math.ceil(totalAbsent * 0.75));
  const excusedRate = totalAbsent > 0 ? ((excusedCount / totalAbsent) * 100).toFixed(1) : '100.0';

  const rfidRateEl = document.getElementById('dashAttRfidRate');
  const rfidCountEl = document.getElementById('dashAttRfidCount');
  const manRateEl = document.getElementById('dashAttManualRate');
  const manCountEl = document.getElementById('dashAttManualCount');
  const excRateEl = document.getElementById('dashAttExcusedRate');
  const excCountEl = document.getElementById('dashAttExcusedCount');

  if (rfidRateEl) rfidRateEl.textContent = `${rfidRate}%`;
  if (rfidCountEl) rfidCountEl.textContent = `${rfidCount} of ${totalPresent}`;
  if (manRateEl) manRateEl.textContent = `${manualRate}%`;
  if (manCountEl) manCountEl.textContent = `${manualCount} of ${totalPresent}`;
  if (excRateEl) excRateEl.textContent = `${excusedRate}%`;
  if (excCountEl) excCountEl.textContent = `${excusedCount} of ${totalAbsent}`;
}

function switchDashSubtab(tab) {
  AppState.dashSubtab = tab;

  document.getElementById('tabBusDetails')?.classList.toggle('active', tab === 'details');
  document.getElementById('tabBusComplaints')?.classList.toggle('active', tab === 'complaints');

  document.getElementById('dashSubtabContentDetails')?.classList.toggle('hidden', tab !== 'details');
  document.getElementById('dashSubtabContentComplaints')?.classList.toggle('hidden', tab !== 'complaints');
}

// Google Maps API Key provided for live transit tracking
const GOOGLE_MAPS_API_KEY = 'AIzaSyD-1Dc6aFDvUq8dwzAUfWBNwKexsdgmIkE';

// Safe resilient tile layer powered by Google Maps with fallback
function createSafeTileLayer(mapInstance) {
  // Official Google Maps Roadmap Tiles powered by user's Google Maps API Key
  const primaryTiles = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${GOOGLE_MAPS_API_KEY}`, {
    maxZoom: 20,
    subdomains: '0123',
    attribution: '&copy; Google Maps'
  });

  // Handle tile loading errors by seamlessly falling back to OpenStreetMap
  primaryTiles.on('tileerror', function() {
    if (mapInstance && !mapInstance._hasFallbackTileLayer) {
      mapInstance._hasFallbackTileLayer = true;
      console.warn('Google Maps tile layer error, activating OpenStreetMap fallback');
      const fallbackTiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      });
      fallbackTiles.addTo(mapInstance);
    }
  });

  return primaryTiles;
}

function initDashboardMap() {
  const mapEl = document.getElementById('dashLeafletMap');
  if (!mapEl) return;

  if (typeof L === 'undefined') {
    console.warn('Leaflet library is still loading, retrying dashboard map initialization in 150ms...');
    setTimeout(initDashboardMap, 150);
    return;
  }

  // Ensure default Leaflet marker assets resolve cleanly on GitHub Pages
  try {
    if (L.Icon && L.Icon.Default && !L.Icon.Default._ghConfigured) {
      L.Icon.Default._ghConfigured = true;
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
      });
    }
  } catch (e) {}

  // If map already exists, invalidate size and return to prevent reinitialization errors
  if (AppState.dashMap) {
    try {
      AppState.dashMap.invalidateSize();
      return;
    } catch (e) {
      console.warn('Map refresh exception:', e);
    }
  }

  if (mapEl._leaflet_id) {
    try {
      delete mapEl._leaflet_id;
    } catch (e) {}
  }

  const map = L.map(mapEl, { 
    zoomControl: false, 
    attributionControl: false,
    scrollWheelZoom: false,
    fadeAnimation: true
  }).setView([18.545, 73.96], 12);

  const tiles = createSafeTileLayer(map);
  tiles.addTo(map);
  AppState.dashMap = map;

  const initialKey = AppState.busKeys[AppState.selectedBusIndex] || 'bus-e';
  updateDashboardRoute(initialKey);

  [60, 200, 500, 1000, 2000].forEach(delay => {
    setTimeout(() => {
      if (AppState.dashMap) AppState.dashMap.invalidateSize();
    }, delay);
  });
}

// =============================================================================
// ROUTES DIRECTORY VIEW
// =============================================================================

function renderRoutesDirectory() {
  const container = document.getElementById('routesGridContainer');
  if (!container) return;

  const filtered = ROUTES_DATA.filter(r => {
    if (AppState.routeFilter === 'active') return r.status === 'active';
    if (AppState.routeFilter === 'maintenance') return r.status === 'maintenance';
    return true;
  });

  const driverPhotoMap = {
    'Santosh Jadhav': 'assets/driver-santosh.jpg',
    'Vijay Kumar': 'assets/driver-vijay.jpg',
    'Prakash Jagtap': 'assets/driver-prakash.jpg',
    'Ramesh Shinde': 'assets/driver-ramesh.jpg',
    'Arun Patil': 'assets/driver-arun.jpg',
    'Sanjay Deshmukh': 'assets/driver-sanjay.jpg',
    'Tanaji More': 'assets/driver-tanaji.jpg',
    'Sambhaji Kadam': 'assets/driver-sambhaji.jpg',
    'Sambhaji Shinde': 'assets/driver-sambhaji.jpg',
    'Chandrakant Mane': 'assets/driver-chandrakant.jpg',
    'Chandrakant Shinde': 'assets/driver-chandrakant.jpg',
    'Ankush Shinde': 'assets/driver-ankush.jpg',
    'Ankush Bhosale': 'assets/driver-ankush.jpg',
    'Kishor Chavan': 'assets/driver-kishor.jpg',
    'Baban Gaikwad': 'assets/driver-baban.jpg',
    'Mahesh Thorat': 'assets/driver-mahesh.jpg',
    'Nitin Pawar': 'assets/driver-nitin.jpg'
  };

  container.innerHTML = filtered.map(r => {
    const busCode = r.name.split(' - ')[0] || r.name;
    const corridorName = (r.name.split(' - ')[1] || r.name) + ' Corridor';
    const driverPhoto = driverPhotoMap[r.driver] || 'assets/driver-santosh.jpg';
    const occupancyPct = Math.round(((r.enrolled || 0) / (r.cap || 49)) * 100);
    const isMaint = r.status === 'maintenance';

    return `
      <div class="route-card-clean" onclick="openRouteDetail('${r.id}')" title="Inspect ${r.name}">
        <!-- Top Row: Badge, Route Corridor & Status -->
        <div class="route-card-top-row">
          <div class="route-card-code-badge">${busCode}</div>
          <div class="route-card-title-col">
            <h4 class="route-card-title">${corridorName}</h4>
          </div>
          <span class="badge-clean ${r.status}">
            ${isMaint ? 'Maintenance' : 'Active'}
          </span>
        </div>

        <!-- Middle: Clean Journey Track (No nested box, pure elegant alignment) -->
        <div class="route-journey-track">
          <div class="journey-point origin">
            <span class="point-dot origin"></span>
            <span class="point-name">${r.origin}</span>
          </div>
          <div class="journey-connector">
            <span class="journey-line"></span>
            <span class="journey-duration"><i class="ph ph-clock"></i> ${r.time}</span>
          </div>
          <div class="journey-point destination">
            <span class="point-dot dest"></span>
            <span class="point-name">Campus Loni</span>
          </div>
        </div>

        <!-- Telemetry Row: Clean inline stats with vertical separators (NO nested boxes) -->
        <div class="route-meta-strip">
          <div class="meta-col">
            <span class="meta-label">Stops</span>
            <span class="meta-val"><i class="ph ph-map-pin"></i> ${r.stops}</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-col">
            <span class="meta-label">Vehicle</span>
            <span class="meta-val vehicle-no">${r.bus}</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-col">
            <span class="meta-label">Occupancy</span>
            <span class="meta-val">${r.enrolled} / ${r.cap} <small>(${occupancyPct}%)</small></span>
          </div>
        </div>

        <!-- Slim hairline progress bar -->
        <div class="route-capacity-bar-wrap">
          <div class="route-capacity-bar-fill ${occupancyPct > 85 ? 'high' : ''}" style="width: ${occupancyPct}%;"></div>
        </div>

        <!-- Footer Row: Driver Avatar & Detail Link -->
        <div class="route-card-foot-row">
          <div class="route-driver-tag">
            <img src="${driverPhoto}" alt="${r.driver}" class="route-driver-img">
            <div>
              <span class="driver-name">${r.driver}</span>
              <span class="driver-rating">4.9 Rating</span>
            </div>
          </div>
          <span class="route-view-cta">
            Detail <i class="ph ph-arrow-right"></i>
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function setRouteFilter(status, btn) {
  AppState.routeFilter = status;
  document.querySelectorAll('.toolbar-pills .pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRoutesDirectory();
}

function filterRoutes() {
  const q = document.getElementById('routeSearchInput').value.toLowerCase();
  document.querySelectorAll('.route-card-item').forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(q) ? 'block' : 'none';
  });
}

// =============================================================================
// ROUTE DETAIL VIEW (CUSTOM ROUTE VIEW SPEC)
// =============================================================================

function openRouteDetail(routeId) {
  AppState.currentRouteId = routeId;
  navigateTo('route-detail');
  renderRouteDetail(routeId);
}

function renderRouteDetail(routeId) {
  const route = BUS_ROUTES_DETAILED[routeId] || BUS_ROUTES_DETAILED['bus-e'];

  // Top Title, Breadcrumb and Subtitle
  const titleEl = document.getElementById('rdRouteTitle');
  const breadcrumbCurrent = document.getElementById('rdBreadcrumbCurrent');
  const subEl = document.getElementById('rdRouteSubtitle');
  const statusBadge = document.getElementById('rdRouteStatusBadge');
  const callBtn = document.getElementById('rdCallDriverBtn');

  const routeDisplayName = `${route.name} Corridor`;
  if (titleEl) titleEl.textContent = routeDisplayName;
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = routeDisplayName;

  if (subEl) {
    const stopsCount = route.stops ? route.stops.length : 9;
    subEl.innerHTML = `
      <span class="meta-item"><i class="ph ph-map-pin"></i> <span>Origin: <strong>${route.origin || 'Nigdi Pradhikaran'}</strong></span></span>
      <span class="meta-sep">•</span>
      <span class="meta-item"><i class="ph ph-flag-banner"></i> <span>Destination: <strong>${route.dest || 'MIT Campus Loni'}</strong></span></span>
      <span class="meta-sep">•</span>
      <span class="meta-item"><i class="ph ph-signpost"></i> <span>${stopsCount} Stops</span></span>
      <span class="meta-sep">•</span>
      <span class="meta-item"><i class="ph ph-clock"></i> <span>${route.time || '45 mins'}</span></span>
    `;
  }

  if (statusBadge) {
    const isActive = route.status === 'active';
    statusBadge.className = `inside-status-badge ${isActive ? 'operational' : 'danger'}`;
    statusBadge.innerHTML = `
      <span class="inside-status-dot"></span>
      <span class="inside-status-label">${isActive ? 'Active' : 'Maintenance'}</span>
    `;
  }
  if (callBtn) {
    callBtn.setAttribute('onclick', `triggerCall('${route.driver.phone}')`);
  }

  // Origin & Destination Badges on Map
  const oName = document.getElementById('rdOriginBadgeName');
  const oTime = document.getElementById('rdOriginBadgeTime');
  const dName = document.getElementById('rdDestBadgeName');
  const dTime = document.getElementById('rdDestBadgeTime');
  if (oName) oName.textContent = route.origin;
  if (oTime) oTime.textContent = `${route.departure} Departure`;
  if (dName) dName.textContent = route.dest;
  if (dTime) dTime.textContent = `${route.arrival} Arrival`;

  // Assigned Bus Details (2 Buses: Bus 1 & Bus 2 - speed & diesel removed, last service date added)
  const bus1 = {
    plate: route.bus?.plate || 'MH12-CD-5678',
    reg: route.bus?.reg || 'Coach #09 • REG-1192 • Deluxe High-Deck',
    capacity: route.bus?.capacity || `${route.cap || 49} Seats (${route.enrolled || route.passengers?.length || 28} Enrolled)`,
    owner: route.bus?.owner || 'MIT ADT University Owned',
    lastService: route.bus?.lastService || (route.id === 'bus-e' ? '28 Feb 2026' : '12 Jan 2026'),
    status: route.bus?.status || 'Operational'
  };

  const bus2 = route.bus2 || {
    plate: route.id === 'bus-a' ? 'MH12-RN-4421' : (route.id === 'bus-e' ? 'MH12-KL-3309' : 'MH12-TX-8812'),
    reg: 'Coach #14 • REG-2044 • Standard 49',
    capacity: '49 Seats (Standby)',
    owner: 'MIT ADT University Fleet',
    lastService: '04 Feb 2026',
    status: 'Operational'
  };

  const p1 = document.getElementById('rdBus1Plate');
  if (p1) p1.textContent = bus1.plate;
  const r1 = document.getElementById('rdBus1Reg');
  if (r1) r1.textContent = bus1.reg;

  const p2 = document.getElementById('rdBus2Plate');
  if (p2) p2.textContent = bus2.plate;
  const r2 = document.getElementById('rdBus2Reg');
  if (r2) r2.textContent = bus2.reg;

  // Backwards compatibility elements
  const oldPlate = document.getElementById('rdBusPlate');
  if (oldPlate) oldPlate.textContent = bus1.plate;
  const oldReg = document.getElementById('rdBusReg');
  if (oldReg) oldReg.textContent = bus1.reg;
  const oldCap = document.getElementById('rdBusCap');
  if (oldCap) oldCap.textContent = bus1.capacity;

  // Assigned Driver Details (card removed from route detail view, safe guards)
  const driverPhotoEl = document.getElementById('rdDriverPhoto');
  if (driverPhotoEl && route.driver?.photo) {
    driverPhotoEl.src = route.driver.photo;
  }
  const dNameEl = document.getElementById('rdDriverName');
  if (dNameEl && route.driver?.name) dNameEl.textContent = route.driver.name;
  const dPhoneEl = document.getElementById('rdDriverPhone');
  if (dPhoneEl && route.driver?.phone) dPhoneEl.textContent = route.driver.phone;
  const dEmpEl = document.getElementById('rdDriverEmpId');
  if (dEmpEl && route.driver?.empId) dEmpEl.textContent = `Emp ID: ${route.driver.empId} • Heavy Transport`;
  const dDutyEl = document.getElementById('rdDriverDuty');
  if (dDutyEl && route.driver?.duty) dDutyEl.textContent = route.driver.duty;

  const attEl = document.getElementById('rdDriverAttendance');
  if (attEl) attEl.textContent = route.driver?.attendance || '98% (27/28 Days)';

  const expEl = document.getElementById('rdDriverExp');
  if (expEl) expEl.textContent = route.driver?.exp || '5.2 Years';

  const ratEl = document.getElementById('rdDriverRating');
  if (ratEl) ratEl.textContent = `${route.driver?.rating || '4.9'}`;

  // Stops Card Header
  const stopsSpan = document.getElementById('rdStopsSpan');
  if (stopsSpan) stopsSpan.textContent = route.origin.split(' ')[0];
  const stopsCountBadge = document.getElementById('rdStopsCountBadge');
  if (stopsCountBadge) stopsCountBadge.textContent = `${route.stops.length} Stops`;

  // Render Numbered Stops (1, 2, 3... like in home)
  const stopsListContainer = document.getElementById('rdStopsListContainer');
  if (stopsListContainer) {
    stopsListContainer.innerHTML = route.stops.map((s, idx) => `
      <div class="route-stop-numbered-row" id="rdStopRow_${idx}">
        <div class="stop-num-circle">${s.number}</div>
        <div class="route-stop-row-meta">
          <div class="route-stop-row-top">
            <span class="route-stop-row-name">${s.name}</span>
            <span class="route-stop-row-time">${s.time}</span>
          </div>
          <div class="route-stop-row-sub">
            <span><i class="ph ph-map-pin"></i> ${s.distance}</span>
            <span><i class="ph ph-users"></i> ${s.boardingCount} boarding</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Ensure passengers are arranged in route stops order
  const stopOrderMap = {};
  route.stops.forEach((s, idx) => { stopOrderMap[s.name] = idx; });
  route.passengers.sort((a, b) => {
    const orderA = stopOrderMap[a.boardingStop] !== undefined ? stopOrderMap[a.boardingStop] : 999;
    const orderB = stopOrderMap[b.boardingStop] !== undefined ? stopOrderMap[b.boardingStop] : 999;
    return orderA - orderB;
  });

  // Populate Passenger Stop Filter dropdown in route stops order
  const stopSelect = document.getElementById('rdPassengerStopFilter');
  if (stopSelect) {
    const routeStopNames = route.stops.map(s => s.name);
    const uniqueStops = routeStopNames.filter(name => route.passengers.some(p => p.boardingStop === name));
    stopSelect.innerHTML = `<option value="all">All Boarding Stops (${route.passengers.length})</option>` +
      uniqueStops.map(s => `<option value="${s}">${s}</option>`).join('');
  }

  // Render Passengers Roster Table
  AppState.routeDetailFilteredPassengers = [...route.passengers];
  renderRoutePassengersTable(AppState.routeDetailFilteredPassengers);

  // Update Badges
  const passBadge = document.getElementById('rdPassengerCountBadge');
  const seatsBadge = document.getElementById('rdAvailableSeatsBadge');
  if (passBadge) passBadge.textContent = `${route.passengers.length} Enrolled`;
  if (seatsBadge) seatsBadge.textContent = `${Math.max(0, route.cap - route.passengers.length)} Seats Available`;

  // Initialize or Update Leaflet Map for Route Detail
  initRouteDetailMap(route);
}

function initRouteDetailMap(route) {
  const mapEl = document.getElementById('routeDetailMap');
  if (!mapEl) return;
  if (typeof L === 'undefined') {
    setTimeout(() => initRouteDetailMap(route), 150);
    return;
  }

  if (!AppState.routeDetailMap) {
    if (mapEl._leaflet_id) {
      try {
        delete mapEl._leaflet_id;
      } catch (e) {}
    }
    AppState.routeDetailMap = L.map(mapEl, { 
      zoomControl: false, 
      attributionControl: false,
      scrollWheelZoom: false,
      fadeAnimation: true
    }).setView([18.545, 73.96], 12);

    const tiles = createSafeTileLayer(AppState.routeDetailMap);
    tiles.addTo(AppState.routeDetailMap);
  }

  [60, 200, 500, 1000, 2000].forEach(delay => {
    setTimeout(() => {
      if (AppState.routeDetailMap) AppState.routeDetailMap.invalidateSize();
    }, delay);
  });

  const map = AppState.routeDetailMap;

  if (AppState.routeDetailPolyline) map.removeLayer(AppState.routeDetailPolyline);
  if (AppState.routeDetailMarkersLayer) map.removeLayer(AppState.routeDetailMarkersLayer);
  if (AppState.routeDetailBusTracker) AppState.routeDetailBusTracker.stop();

  const latLngs = route.stops.map(s => [s.lat, s.lng]);

  AppState.routeDetailPolyline = L.polyline(latLngs, {
    color: '#FF5E00',
    weight: 5,
    opacity: 0.95,
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(map);

  AppState.routeDetailMarkersLayer = L.layerGroup();
  route.stops.forEach((s, idx) => {
    const isTerminus = idx === 0 || idx === route.stops.length - 1;
    L.circleMarker([s.lat, s.lng], {
      radius: isTerminus ? 7 : 5,
      fillColor: '#FFFFFF',
      color: '#F26B1D',
      weight: 3,
      fillOpacity: 1
    }).addTo(AppState.routeDetailMarkersLayer).bindPopup(`
      <div style="font-size: 12px; font-weight: 600; color: #111827;">Stop #${s.number}: ${s.name}</div>
      <div style="font-size: 11px; color: #4B5563; margin-top: 2px;">Scheduled: ${s.time} • Distance: ${s.distance}</div>
      <div style="font-size: 11px; color: #111827; font-weight: 500; margin-top: 2px;">${s.boardingCount} passengers boarding</div>
    `);
  });
  AppState.routeDetailMarkersLayer.addTo(map);

  map.fitBounds(AppState.routeDetailPolyline.getBounds(), { padding: [35, 35] });

  // Start animated moving bus for this route
  const hudBusPill = document.getElementById('rdHudBusPill');
  if (hudBusPill) hudBusPill.textContent = route.name;

  AppState.routeDetailBusTracker = new RouteBusTracker({
    map: map,
    stops: route.stops,
    busLabel: route.name,
    markerId: 'routeDetailBus',
    onUpdate: (data) => {
      const spd = document.getElementById('rdHudSpeed');
      const cur = document.getElementById('rdHudCurrentStop');
      const nxt = document.getElementById('rdHudNextStop');
      const eta = document.getElementById('rdHudEta');
      if (spd) spd.textContent = data.speed;
      if (cur) cur.textContent = data.currentStop;
      if (nxt) nxt.textContent = data.nextStop;
      if (eta) eta.textContent = data.eta;

      // Sync Numbered Stops List highlighting
      route.stops.forEach((_, idx) => {
        const row = document.getElementById(`rdStopRow_${idx}`);
        if (!row) return;
        if (idx === data.legIndex + 1) {
          row.classList.add('active-approaching-stop');
          row.classList.remove('passed-stop');
        } else if (idx <= data.legIndex) {
          row.classList.add('passed-stop');
          row.classList.remove('active-approaching-stop');
        } else {
          row.classList.remove('active-approaching-stop', 'passed-stop');
        }
      });
    }
  });

  setTimeout(() => map.invalidateSize(), 150);
}

function renderRoutePassengersTable(passengers) {
  const tbody = document.getElementById('rdPassengersTableBody');
  if (!tbody) return;

  if (!passengers || !passengers.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">
          No passengers match the specified filters.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = passengers.map(p => {
    const isCollected = (p.passStatus === 'Collected') || (p.status === 'Paid' && p.passStatus !== 'Not collected');
    const passStatusText = isCollected ? 'Collected' : 'Not collected';
    const passBadgeClass = isCollected ? 'operational' : 'warning';
    const feeStatus = p.feeStatus || p.status || 'Paid';
    const feeBadgeClass = feeStatus === 'Paid' ? 'paid' : (feeStatus === 'Pending' ? 'pending' : 'overdue');

    return `
      <tr>
        <td>
          <code>${p.rollNo}</code>
        </td>
        <td>
          <span style="font-weight: 600; color: var(--text-primary);">${p.name}</span>
        </td>
        <td>
          <a href="tel:${p.phone}" style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px; font-variant-numeric: tabular-nums;">
            <i class="ph ph-phone"></i> ${p.phone}
          </a>
        </td>
        <td><span>${p.boardingStop}</span></td>
        <td style="color: var(--text-secondary);">${p.dept}</td>
        <td>
          <span class="pill-pass-status ${isCollected ? 'collected' : 'not-collected'}">
            ${isCollected ? 'Pass Collected' : 'Not Collected'}
          </span>
        </td>
        <td>
          <button type="button" class="badge-clean ${feeBadgeClass}" style="cursor: pointer; border: none; background: transparent;" onclick="toggleRoutePassengerFee('${p.rollNo}')" title="Click to cycle fee status">
            <span class="badge-dot"></span>
            ${feeStatus}
          </button>
        </td>
        <td style="text-align: right; position: relative;">
          <button type="button" class="btn-action-dots" onclick="openPassengerActions('${p.rollNo}', event)" title="Management options">
            <i class="ph ph-dots-three-vertical"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleRoutePassengerFee(rollNo) {
  const route = BUS_ROUTES_DETAILED[AppState.currentRouteId] || BUS_ROUTES_DETAILED['bus-e'];
  if (!route || !route.passengers) return;
  const p = route.passengers.find(x => x.rollNo === rollNo);
  if (!p) return;
  const curFee = p.feeStatus || p.status || 'Paid';
  if (curFee === 'Paid') p.feeStatus = 'Pending';
  else if (curFee === 'Pending') p.feeStatus = 'Overdue';
  else p.feeStatus = 'Paid';
  p.status = p.feeStatus;
  playProminentSound('click');
  filterRoutePassengers();
  triggerToast(`Fee status for ${p.name} updated to ${p.feeStatus}`, 'info');
}

function setRoutePassengerStatusFilter(status, btn) {
  AppState.rdStatusFilter = status;
  const parent = btn?.closest('.toolbar-pills');
  if (parent) {
    parent.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  filterRoutePassengers();
}

function filterRoutePassengers() {
  const route = BUS_ROUTES_DETAILED[AppState.currentRouteId] || BUS_ROUTES_DETAILED['bus-e'];
  if (!route || !route.passengers) return;

  const q = (document.getElementById('rdPassengerSearchInput')?.value || '').toLowerCase().trim();
  const stopFilter = document.getElementById('rdPassengerStopFilter')?.value || 'all';
  const deptFilter = document.getElementById('rdPassengerDeptFilter')?.value || 'all';
  const statusFilter = AppState.rdStatusFilter || 'all';

  const filtered = route.passengers.filter(p => {
    const matchQ = !q || 
      p.name.toLowerCase().includes(q) || 
      p.rollNo.toLowerCase().includes(q) || 
      p.boardingStop.toLowerCase().includes(q) || 
      p.phone.includes(q) ||
      (p.dept && p.dept.toLowerCase().includes(q));
    const matchStop = stopFilter === 'all' || p.boardingStop === stopFilter;
    const matchDept = deptFilter === 'all' || p.dept.toLowerCase().includes(deptFilter.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter.toLowerCase();
    return matchQ && matchStop && matchDept && matchStatus;
  });

  renderRoutePassengersTable(filtered);
}

function resetRoutePassengerFilters() {
  AppState.rdStatusFilter = 'all';
  const qInput = document.getElementById('rdPassengerSearchInput');
  if (qInput) qInput.value = '';
  const stopSel = document.getElementById('rdPassengerStopFilter');
  if (stopSel) stopSel.value = 'all';
  const deptSel = document.getElementById('rdPassengerDeptFilter');
  if (deptSel) deptSel.value = 'all';

  const allTab = document.getElementById('rdTabAll');
  if (allTab) {
    const parent = allTab.closest('.toolbar-pills');
    if (parent) {
      parent.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      allTab.classList.add('active');
    }
  }

  filterRoutePassengers();
  triggerToast('Route manifest filters reset', 'info');
}

function toggleRouteDetailBusMove() {
  const btn = document.getElementById('rdLiveToggleBtn');
  if (AppState.routeDetailBusTracker) {
    const isLive = AppState.routeDetailBusTracker.toggle();
    if (btn) {
      btn.textContent = isLive ? '● Live Tracking' : '▶ Resume Tracking';
      btn.classList.toggle('active', isLive);
    }
    triggerToast(isLive ? 'Live GPS bus tracking resumed' : 'GPS animation paused', 'info');
  }
}

function recenterRouteDetailMap() {
  if (AppState.routeDetailMap && AppState.routeDetailPolyline) {
    if (AppState.routeDetailBusTracker?.marker) {
      AppState.routeDetailMap.setView(AppState.routeDetailBusTracker.marker.getLatLng(), 13);
    } else {
      AppState.routeDetailMap.fitBounds(AppState.routeDetailPolyline.getBounds(), { padding: [30, 30] });
    }
  }
}

function exportPassengerManifest() {
  const route = BUS_ROUTES_DETAILED[AppState.currentRouteId] || BUS_ROUTES_DETAILED['bus-e'];
  playProminentSound('success');
  triggerToast(`Passenger Manifest exported for ${route.name} (${route.passengers.length} Passengers)`, 'success');
}

// =============================================================================
// UNIVERSITY-OWNED BUSES REGISTRY (13 BUSES WITH TRIP SCHEDULES & MAINTENANCE)
// =============================================================================

const UNIVERSITY_DRIVERS_DATA = [
  { id: 'drv-u01', name: 'Santosh Jadhav', photo: 'assets/driver-santosh.jpg', phone: '+91 83368 18273', empId: 'MIT-DRV-101', license: 'MH12-2016-DL44019', assignedBus: 'Bus U-01', duty: 'On Duty', attendance: '98% (27/28 Days)', exp: '5.2 Years', rating: '4.9 / 5.0' },
  { id: 'drv-u02', name: 'Ramesh Shinde', photo: 'assets/driver-ramesh.jpg', phone: '+91 98112 34567', empId: 'MIT-DRV-102', license: 'MH12-2014-DL11029', assignedBus: 'Bus U-02', duty: 'Standby', attendance: '92% (24/28 Days)', exp: '4.0 Years', rating: '4.7 / 5.0' },
  { id: 'drv-u03', name: 'Vijay Kumar', photo: 'assets/driver-vijay.jpg', phone: '+91 98455 77810', empId: 'MIT-DRV-103', license: 'MH12-2018-DL55410', assignedBus: 'Bus U-03', duty: 'On Duty', attendance: '97% (27/28 Days)', exp: '5.0 Years', rating: '4.9 / 5.0' },
  { id: 'drv-u04', name: 'Mahesh Thorat', photo: 'assets/driver-mahesh.jpg', phone: '+91 98229 66102', empId: 'MIT-DRV-104', license: 'MH12-2015-DL99201', assignedBus: 'Bus U-04', duty: 'On Duty', attendance: '95% (26/28 Days)', exp: '4.2 Years', rating: '4.8 / 5.0' },
  { id: 'drv-u05', name: 'Prakash Jagtap', photo: 'assets/driver-prakash.jpg', phone: '+91 97664 88201', empId: 'MIT-DRV-105', license: 'MH12-2017-DL77102', assignedBus: 'Bus U-05', duty: 'On Duty', attendance: '96% (26/28 Days)', exp: '4.8 Years', rating: '4.9 / 5.0' },
  { id: 'drv-u06', name: 'Kishor Chavan', photo: 'assets/driver-kishor.jpg', phone: '+91 98901 44102', empId: 'MIT-DRV-106', license: 'MH12-2016-DL66301', assignedBus: 'Bus U-06', duty: 'On Duty', attendance: '99% (28/28 Days)', exp: '6.1 Years', rating: '5.0 / 5.0' },
  { id: 'drv-u07', name: 'Baban Gaikwad', photo: 'assets/driver-baban.jpg', phone: '+91 98223 11802', empId: 'MIT-DRV-107', license: 'MH12-2015-DL88109', assignedBus: 'Bus U-07', duty: 'On Duty', attendance: '94% (25/28 Days)', exp: '3.8 Years', rating: '4.8 / 5.0' },
  { id: 'drv-u08', name: 'Nitin Pawar', photo: 'assets/driver-nitin.jpg', phone: '+91 98450 44102', empId: 'MIT-DRV-108', license: 'MH12-2019-DL22019', assignedBus: 'Bus U-08', duty: 'On Duty', attendance: '98% (27/28 Days)', exp: '5.5 Years', rating: '4.9 / 5.0' },
  { id: 'drv-u09', name: 'Chandrakant Shinde', photo: 'assets/driver-chandrakant.jpg', phone: '+91 97652 99401', empId: 'MIT-DRV-109', license: 'MH12-2016-DL33901', assignedBus: 'Bus U-09', duty: 'On Duty', attendance: '96% (26/28 Days)', exp: '4.6 Years', rating: '4.8 / 5.0' },
  { id: 'drv-u10', name: 'Ankush Bhosale', photo: 'assets/driver-ankush.jpg', phone: '+91 98904 33210', empId: 'MIT-DRV-110', license: 'MH12-2014-DL44192', assignedBus: 'Bus U-10', duty: 'Standby', attendance: '93% (25/28 Days)', exp: '4.1 Years', rating: '4.7 / 5.0' },
  { id: 'drv-u11', name: 'Tanaji More', photo: 'assets/driver-tanaji.jpg', phone: '+91 98453 66720', empId: 'MIT-DRV-111', license: 'MH12-2017-DL55019', assignedBus: 'Bus U-11', duty: 'On Duty', attendance: '95% (26/28 Days)', exp: '4.0 Years', rating: '4.8 / 5.0' },
  { id: 'drv-u12', name: 'Sanjay Deshmukh', photo: 'assets/driver-sanjay.jpg', phone: '+91 98231 77092', empId: 'MIT-DRV-112', license: 'MH12-2016-DL77123', assignedBus: 'Bus U-12', duty: 'On Duty', attendance: '97% (27/28 Days)', exp: '5.2 Years', rating: '4.9 / 5.0' },
  { id: 'drv-u13', name: 'Sambhaji Shinde', photo: 'assets/driver-sambhaji.jpg', phone: '+91 97660 11482', empId: 'MIT-DRV-113', license: 'MH12-2020-DL99014', assignedBus: 'Bus U-13', duty: 'On Duty', attendance: '99% (28/28 Days)', exp: '5.8 Years', rating: '5.0 / 5.0' },
  { id: 'drv-u14', name: 'Ganesh Shinde', photo: 'assets/driver-sambhaji.jpg', phone: '+91 98224 55190', empId: 'MIT-DRV-114', license: 'MH12-2018-DL66190', assignedBus: 'Bus U-14', duty: 'On Duty', attendance: '97% (27/28 Days)', exp: '4.7 Years', rating: '4.9 / 5.0' },
  { id: 'drv-u15', name: 'Deepak Jagtap', photo: 'assets/driver-prakash.jpg', phone: '+91 97650 33412', empId: 'MIT-DRV-115', license: 'MH12-2017-DL88204', assignedBus: 'Bus U-15', duty: 'On Duty', attendance: '96% (26/28 Days)', exp: '5.1 Years', rating: '4.8 / 5.0' },
  { id: 'drv-u16', name: 'Anil Salunke', photo: 'assets/driver-vijay.jpg', phone: '+91 98902 77103', empId: 'MIT-DRV-116', license: 'MH12-2019-DL33109', assignedBus: 'Bus U-16', duty: 'On Duty', attendance: '98% (27/28 Days)', exp: '4.5 Years', rating: '4.9 / 5.0' },
  { id: 'drv-u17', name: 'Pravin Gaikwad', photo: 'assets/driver-santosh.jpg', phone: '+91 98451 99201', empId: 'MIT-DRV-117', license: 'MH12-2015-DL55401', assignedBus: 'Bus U-17', duty: 'On Duty', attendance: '95% (26/28 Days)', exp: '5.4 Years', rating: '5.0 / 5.0' }
];

const UNIVERSITY_BUSES_DATA = [
  {
    id: 'bus-u01',
    code: 'Bus U-01',
    plate: 'MH12-CD-5678',
    reg: 'Coach #01 • REG-1011',
    model: 'Ashok Leyland 49 Deluxe High-Deck',
    capacity: 49,
    status: 'Scheduled',
    odometer: '38,400 km',
    fuel: '88% Diesel (Internal Pump)',
    assignedCorridor: 'Bageshree Hostel • Loni Kalbhor',
    origin: 'Bageshree Hostel',
    dest: 'MIT Campus Loni',
    departure: '6:45 AM',
    arrival: '7:30 AM',
    distance: '8.2',
    progressPct: 70,
    driver: UNIVERSITY_DRIVERS_DATA[0],
    tripSchedule: [
      { id: 'trip-01', date: '30 Mar, 2026', timings: '8:30 AM – 4:30 PM', reason: 'Industrial Visit - Tata Motors Chakan Cluster', status: 'Scheduled', faculty: 'Prof. Harsh Bhawsar', contact: '+91 98450 22391', college: 'School of Engineering', passengers: 44 },
      { id: 'trip-02', date: '14 Feb, 2026', timings: '9:00 AM – 3:30 PM', reason: 'ARAI (Automotive Research Association) Tech Expo', status: 'Completed', faculty: 'Dr. Sarah Miller', contact: '+91 91234 56789', college: 'School of Design', passengers: 40 },
      { id: 'trip-03', date: '22 Jan, 2026', timings: '7:30 AM – 6:00 PM', reason: 'Faculty Research Conclave - Pune University', status: 'Completed', faculty: 'Dr. Rajesh Patil', contact: '+91 98220 11984', college: 'School of Computing', passengers: 35 }
    ],
    maintenanceHistory: [
      { date: '12 Mar, 2026', odometer: '37,500 km', reason: 'Routine 40k km Service, Brake Pad Replacement & Fluid Flush', level: 'Periodic Maintenance', technician: 'Campus Workshop Bay 1', cost: '₹14,500', status: 'Completed' },
      { date: '18 Jan, 2026', odometer: '34,200 km', reason: 'Tyre Rotation, Wheel Alignment & Suspension Bushing Check', level: 'Preventative', technician: 'Depot Pit 2', cost: '₹6,800', status: 'Completed' },
      { date: '05 Nov, 2025', odometer: '29,800 km', reason: 'AC Compressor Gas Refill & Air Filter Replacement', level: 'Minor Service', technician: 'Authorized CoolTech', cost: '₹8,200', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u02',
    code: 'Bus U-02',
    plate: 'MH12-GH-1122',
    reg: 'Coach #02 • REG-1012',
    model: 'Tata Marcopolo 49 Seater Deluxe',
    capacity: 49,
    status: 'Maintenance',
    odometer: '62,100 km',
    fuel: '55% Diesel (Workshop Berth)',
    assignedCorridor: 'Indrayani Boys Hostel • Loni',
    origin: 'Indrayani Hostel',
    dest: 'MIT Campus Loni',
    departure: 'Depot Berth',
    arrival: 'Service Bay 3',
    distance: '7.5',
    progressPct: 20,
    driver: UNIVERSITY_DRIVERS_DATA[1],
    tripSchedule: [
      { id: 'trip-04', date: '05 Apr, 2026', timings: '9:30 AM – 5:00 PM', reason: 'Kirloskar Pneumatic Industrial Visit', status: 'Scheduled', faculty: 'Prof. Anjali Mehta', contact: '+91 98231 77650', college: 'School of Engineering', passengers: 42 },
      { id: 'trip-05', date: '19 Jan, 2026', timings: '8:00 AM – 4:00 PM', reason: 'Aga Khan Palace Heritage Study Tour', status: 'Completed', faculty: 'Prof. Vikram Joshi', contact: '+91 98901 33412', college: 'Faculty of Architecture', passengers: 46 }
    ],
    maintenanceHistory: [
      { date: '28 Mar, 2026', odometer: '62,100 km', reason: 'Clutch Plate Overhaul & Gearbox Synchronizer Ring Repair', level: 'Major Overhaul', technician: 'Central Workshop Bay 3', cost: '₹32,400', status: 'In Progress' },
      { date: '10 Dec, 2025', odometer: '58,400 km', reason: 'Cooling System Radiator Flush & Hose Replacement', level: 'Preventative', technician: 'Depot Pit 1', cost: '₹9,100', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u03',
    code: 'Bus U-03',
    plate: 'MH12-IJ-2233',
    reg: 'Coach #03 • REG-1013',
    model: 'BharatBenz 49 Seater Glider AC',
    capacity: 49,
    status: 'Scheduled',
    odometer: '24,900 km',
    fuel: '92% Diesel (Campus Pump)',
    assignedCorridor: 'Tata Motors Chakan Field Lab',
    origin: 'MIT Campus Loni',
    dest: 'Tata Motors Chakan',
    departure: '8:30 AM',
    arrival: '4:30 PM',
    distance: '46.0',
    progressPct: 40,
    driver: UNIVERSITY_DRIVERS_DATA[2],
    tripSchedule: [
      { id: 'trip-06', date: '31 Mar, 2026', timings: '7:00 AM – 7:30 PM', reason: 'ISRO Telemetry Centre & Space Tech Seminar (Baramati)', status: 'Booked', faculty: 'Dr. Ravindra Kulkarni', contact: '+91 98224 88901', college: 'School of Computing', passengers: 45 },
      { id: 'trip-07', date: '02 Mar, 2026', timings: '8:00 AM – 2:00 PM', reason: 'National Film Archive of India Study Trip', status: 'Completed', faculty: 'Prof. Shilpa Nair', contact: '+91 97651 22390', college: 'Institute of Design', passengers: 38 },
      { id: 'trip-08', date: '18 Jan, 2026', timings: '9:00 AM – 5:00 PM', reason: 'Praj Industries Bio-energy Field Visit', status: 'Completed', faculty: 'Prof. Sandeep Shinde', contact: '+91 98662 11980', college: 'School of Engineering', passengers: 40 }
    ],
    maintenanceHistory: [
      { date: '20 Feb, 2026', odometer: '23,800 km', reason: 'Air Suspension Pressure Sensor Calibration & Diagnostics', level: 'Preventative', technician: 'BharatBenz Authorized Center', cost: '₹11,200', status: 'Completed' },
      { date: '02 Nov, 2025', odometer: '19,500 km', reason: '20,000 km Scheduled Service & Synthetic Oil Change', level: 'Periodic Maintenance', technician: 'Central Workshop Bay 1', cost: '₹16,800', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u04',
    code: 'Bus U-04',
    plate: 'MH12-KL-3344',
    reg: 'Coach #04 • REG-1014',
    model: 'Ashok Leyland 49 Lynx Smart',
    capacity: 49,
    status: 'Available',
    odometer: '41,200 km',
    fuel: '84% Diesel (Campus Pump)',
    assignedCorridor: 'Saraswati Girls Hostel • Loni',
    origin: 'Saraswati Hostel',
    dest: 'MIT Campus Loni',
    departure: '7:00 AM',
    arrival: '7:45 AM',
    distance: '6.8',
    progressPct: 80,
    driver: UNIVERSITY_DRIVERS_DATA[3],
    tripSchedule: [
      { id: 'trip-09', date: '03 Apr, 2026', timings: '10:00 AM – 4:00 PM', reason: 'Pimpri Chinchwad Science Park Student Exhibition', status: 'Scheduled', faculty: 'Prof. Neha Kothari', contact: '+91 98902 44512', college: 'School of Design', passengers: 44 },
      { id: 'trip-10', date: '25 Jan, 2026', timings: '8:30 AM – 1:30 PM', reason: 'Mahratta Chamber of Commerce Industrial Meet', status: 'Completed', faculty: 'Prof. Amit Sawant', contact: '+91 98450 77123', college: 'School of Management', passengers: 32 }
    ],
    maintenanceHistory: [
      { date: '04 Mar, 2026', odometer: '40,000 km', reason: 'Front Brake Linings & Master Cylinder Servicing', level: 'Periodic Maintenance', technician: 'Campus Workshop Bay 2', cost: '₹12,400', status: 'Completed' },
      { date: '15 Dec, 2025', odometer: '36,900 km', reason: 'Headlight Beam Leveling & Electrical Loom Audit', level: 'Minor Service', technician: 'Depot Pit 1', cost: '₹3,500', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u05',
    code: 'Bus U-05',
    plate: 'MH12-MN-4455',
    reg: 'Coach #05 • REG-1015',
    model: 'Tata Starbus Ultra 44 Seater AC',
    capacity: 44,
    status: 'Scheduled',
    odometer: '31,500 km',
    fuel: '76% Diesel (Campus Pump)',
    assignedCorridor: 'Sinhagad Fort Trek Base Camp',
    origin: 'MIT Campus Loni',
    dest: 'Sinhagad Fort Base',
    departure: '6:00 AM',
    arrival: '3:00 PM',
    distance: '44.5',
    progressPct: 50,
    driver: UNIVERSITY_DRIVERS_DATA[4],
    tripSchedule: [
      { id: 'trip-11', date: '29 Mar, 2026', timings: '9:00 AM – 6:00 PM', reason: 'Academic Council State Delegation Transit', status: 'Completed', faculty: 'Dr. Hemant Deshpande', contact: '+91 98221 66502', college: 'All Campuses Shuttle', passengers: 38 },
      { id: 'trip-12', date: '12 Feb, 2026', timings: '8:00 AM – 5:00 PM', reason: 'Design Innovation Conclave - Balewadi Stadium', status: 'Completed', faculty: 'Prof. Pooja Verma', contact: '+91 98451 99014', college: 'Institute of Design', passengers: 42 }
    ],
    maintenanceHistory: [
      { date: '15 Feb, 2026', odometer: '30,200 km', reason: 'Air Conditioning Duct Sanitization & Cabin Filter Swap', level: 'Minor Service', technician: 'CoolTech Service Bay', cost: '₹5,600', status: 'Completed' },
      { date: '20 Nov, 2025', odometer: '26,100 km', reason: 'Full Chassis Greasing & Differential Oil Top-up', level: 'Preventative', technician: 'Campus Workshop Bay 1', cost: '₹7,200', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u06',
    code: 'Bus U-06',
    plate: 'MH12-OP-5566',
    reg: 'Coach #06 • REG-1016',
    model: 'Ashok Leyland 49 Deluxe High-Deck',
    capacity: 49,
    status: 'Available',
    odometer: '28,300 km',
    fuel: '85% Diesel (Campus Pump)',
    assignedCorridor: 'ARAI Tech Centre Field Visit',
    origin: 'MIT Campus Loni',
    dest: 'ARAI Chakan Lab',
    departure: '9:00 AM',
    arrival: '3:30 PM',
    distance: '42.0',
    progressPct: 85,
    driver: UNIVERSITY_DRIVERS_DATA[5],
    tripSchedule: [
      { id: 'trip-13', date: '01 Apr, 2026', timings: '7:30 AM – 6:30 PM', reason: 'Serum Institute of India Biotechnology Tour (Hadapsar)', status: 'Booked', faculty: 'Dr. Sunita Kadam', contact: '+91 98230 44901', college: 'School of Engineering', passengers: 46 },
      { id: 'trip-14', date: '20 Feb, 2026', timings: '8:30 AM – 4:00 PM', reason: 'Whistling Woods International Animation Studio Visit', status: 'Completed', faculty: 'Prof. Kunal Salunke', contact: '+91 97652 88401', college: 'School of Design', passengers: 44 }
    ],
    maintenanceHistory: [
      { date: '08 Feb, 2026', odometer: '26,900 km', reason: 'Brake Disc Inspection & Air Dryer Filter Replacement', level: 'Preventative', technician: 'Depot Pit 2', cost: '₹8,900', status: 'Completed' },
      { date: '14 Oct, 2025', odometer: '21,400 km', reason: 'Engine Valve Clearance Adjustment & Fuel Filter Renewal', level: 'Periodic Maintenance', technician: 'Central Workshop Bay 2', cost: '₹13,800', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u07',
    code: 'Bus U-07',
    plate: 'MH12-QR-6677',
    reg: 'Coach #07 • REG-1017',
    model: 'Tata Marcopolo 49 Seater Deluxe',
    capacity: 49,
    status: 'Available',
    odometer: '44,700 km',
    fuel: '80% Diesel (Campus Pump)',
    assignedCorridor: 'Godavari Girls Hostel • Loni',
    origin: 'Godavari Hostel',
    dest: 'MIT Campus Loni',
    departure: '7:15 AM',
    arrival: '8:00 AM',
    distance: '9.1',
    progressPct: 70,
    driver: UNIVERSITY_DRIVERS_DATA[6],
    tripSchedule: [
      { id: 'trip-15', date: '04 Apr, 2026', timings: '9:00 AM – 3:30 PM', reason: 'Cummins India Technical Centre Survey', status: 'Scheduled', faculty: 'Prof. Rakesh Shinde', contact: '+91 98453 00192', college: 'School of Engineering', passengers: 42 },
      { id: 'trip-16', date: '10 Feb, 2026', timings: '8:30 AM – 5:00 PM', reason: 'Pune Smart City Command Centre Field Excursion', status: 'Completed', faculty: 'Prof. Maya Sen', contact: '+91 98901 77310', college: 'School of Computing', passengers: 45 }
    ],
    maintenanceHistory: [
      { date: '22 Feb, 2026', odometer: '43,100 km', reason: 'Battery Bank Testing & Alternator Belt Tensioning', level: 'Minor Service', technician: 'Campus Workshop Bay 1', cost: '₹4,200', status: 'Completed' },
      { date: '18 Nov, 2025', odometer: '38,900 km', reason: 'Brake Booster Servicing & Tire Retreading Assessment', level: 'Preventative', technician: 'Depot Pit 1', cost: '₹10,500', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u08',
    code: 'Bus U-08',
    plate: 'MH12-ST-7788',
    reg: 'Coach #08 • REG-1018',
    model: 'BharatBenz 49 Seater Glider AC',
    capacity: 49,
    status: 'Scheduled',
    odometer: '19,800 km',
    fuel: '90% Diesel (Campus Pump)',
    assignedCorridor: 'Rajgad Fort Trekking Camp',
    origin: 'MIT Campus Loni',
    dest: 'Rajgad Fort Base',
    departure: '5:30 AM',
    arrival: '6:00 PM',
    distance: '58.0',
    progressPct: 30,
    driver: UNIVERSITY_DRIVERS_DATA[7],
    tripSchedule: [
      { id: 'trip-17', date: '06 Apr, 2026', timings: '8:00 AM – 6:00 PM', reason: 'National Architecture Biennial - Lavasa City Study', status: 'Scheduled', faculty: 'Ar. Devdatta Joshi', contact: '+91 98224 88102', college: 'Faculty of Architecture', passengers: 47 },
      { id: 'trip-18', date: '15 Jan, 2026', timings: '9:00 AM – 4:00 PM', reason: 'Infosys Hinjewadi Software Campus Immersion', status: 'Completed', faculty: 'Dr. Pankaj Muley', contact: '+91 97660 77412', college: 'School of Computing', passengers: 48 }
    ],
    maintenanceHistory: [
      { date: '10 Jan, 2026', odometer: '18,500 km', reason: 'Scheduled 20k km Inspection & Electronic Stability Audit', level: 'Periodic Maintenance', technician: 'BharatBenz Authorized Center', cost: '₹15,200', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u09',
    code: 'Bus U-09',
    plate: 'MH12-UV-8899',
    reg: 'Coach #09 • REG-1019',
    model: 'Ashok Leyland 49 Lynx Smart',
    capacity: 49,
    status: 'Available',
    odometer: '37,200 km',
    fuel: '82% Diesel (Campus Pump)',
    assignedCorridor: 'Praj Bio-energy Field Station',
    origin: 'MIT Campus Loni',
    dest: 'Praj Bio-energy Lab',
    departure: '8:00 AM',
    arrival: '5:00 PM',
    distance: '36.5',
    progressPct: 60,
    driver: UNIVERSITY_DRIVERS_DATA[8],
    tripSchedule: [
      { id: 'trip-19', date: '08 Apr, 2026', timings: '8:30 AM – 5:30 PM', reason: 'Bhartiya Sanskriti Darshan Museum & Research Centre', status: 'Scheduled', faculty: 'Prof. Smita Kulkarni', contact: '+91 98903 22194', college: 'Institute of Design', passengers: 40 },
      { id: 'trip-20', date: '28 Jan, 2026', timings: '9:30 AM – 3:30 PM', reason: 'Finolex Cables Urse Plant Operational Review', status: 'Completed', faculty: 'Prof. Vinod Deshpande', contact: '+91 98230 44102', college: 'School of Engineering', passengers: 43 }
    ],
    maintenanceHistory: [
      { date: '16 Jan, 2026', odometer: '35,000 km', reason: 'Steering Kingpin Greasing & Front Wheel Bearing Re-pack', level: 'Preventative', technician: 'Central Workshop Bay 2', cost: '₹7,900', status: 'Completed' },
      { date: '02 Oct, 2025', odometer: '30,100 km', reason: 'Wiper Motor Replacement & Washer Jet Plumbing Repair', level: 'Minor Service', technician: 'Depot Pit 2', cost: '₹2,800', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u10',
    code: 'Bus U-10',
    plate: 'MH12-WX-9900',
    reg: 'Coach #10 • REG-1020',
    model: 'Tata Marcopolo 49 Seater Deluxe',
    capacity: 49,
    status: 'Maintenance',
    odometer: '55,300 km',
    fuel: '40% Diesel (Workshop Berth)',
    assignedCorridor: 'Vishwa Boys Hostel • Loni Campus',
    origin: 'Vishwa Hostel',
    dest: 'MIT Campus Loni',
    departure: 'Workshop Berth',
    arrival: 'Bay 1 Inspection',
    distance: '5.4',
    progressPct: 15,
    driver: UNIVERSITY_DRIVERS_DATA[9],
    tripSchedule: [
      { id: 'trip-21', date: '10 Apr, 2026', timings: '9:00 AM – 4:30 PM', reason: 'Tata Autocomp Systems Technical Tour', status: 'Scheduled', faculty: 'Prof. Sandeep Patil', contact: '+91 97652 11983', college: 'School of Engineering', passengers: 45 },
      { id: 'trip-22', date: '04 Feb, 2026', timings: '8:00 AM – 2:00 PM', reason: 'National Institute of Virology Facility Visit', status: 'Completed', faculty: 'Dr. Radhika Sen', contact: '+91 98452 88401', college: 'School of Computing', passengers: 39 }
    ],
    maintenanceHistory: [
      { date: '29 Mar, 2026', odometer: '55,300 km', reason: 'Exhaust Gas Recirculation (EGR) Valve Cleaning & Turbo Inspection', level: 'Major Overhaul', technician: 'Depot Workshop Bay 3', cost: '₹24,500', status: 'In Progress' },
      { date: '12 Dec, 2025', odometer: '51,800 km', reason: 'Suspension Leaf Spring Bush Replacement & Shock Absorbers Test', level: 'Preventative', technician: 'Central Workshop Bay 1', cost: '₹13,200', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u11',
    code: 'Bus U-11',
    plate: 'MH12-YZ-1021',
    reg: 'Coach #11 • REG-1021',
    model: 'Tata Starbus Ultra 44 Seater AC',
    capacity: 44,
    status: 'Scheduled',
    odometer: '27,100 km',
    fuel: '87% Diesel (Campus Pump)',
    assignedCorridor: 'Torna Fort Trekking Route',
    origin: 'MIT Campus Loni',
    dest: 'Torna Trek Trailhead',
    departure: '5:00 AM',
    arrival: '5:30 PM',
    distance: '62.0',
    progressPct: 45,
    driver: UNIVERSITY_DRIVERS_DATA[10],
    tripSchedule: [
      { id: 'trip-23', date: '12 Apr, 2026', timings: '8:30 AM – 5:00 PM', reason: 'Godrej & Boyce Shirwal Manufacturing Expo', status: 'Scheduled', faculty: 'Prof. Sameer Kulkarni', contact: '+91 98901 66320', college: 'School of Engineering', passengers: 42 },
      { id: 'trip-24', date: '18 Feb, 2026', timings: '9:00 AM – 3:00 PM', reason: 'Pune Heritage Walking Tour & Studio Documentation', status: 'Completed', faculty: 'Ar. Tanvi Shah', contact: '+91 98223 99401', college: 'Faculty of Architecture', passengers: 40 }
    ],
    maintenanceHistory: [
      { date: '05 Jan, 2026', odometer: '24,600 km', reason: 'Engine Oil Replacement & All Fluid Levels Top-up', level: 'Periodic Maintenance', technician: 'Campus Workshop Bay 2', cost: '₹11,400', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u12',
    code: 'Bus U-12',
    plate: 'MH12-AA-2022',
    reg: 'Coach #12 • REG-1022',
    model: 'Ashok Leyland 49 Deluxe High-Deck',
    capacity: 49,
    status: 'Available',
    odometer: '33,900 km',
    fuel: '78% Diesel (Campus Pump)',
    assignedCorridor: 'Serum Bio-Tech Research Park',
    origin: 'MIT Campus Loni',
    dest: 'Serum Bio Park',
    departure: '7:30 AM',
    arrival: '6:30 PM',
    distance: '18.0',
    progressPct: 90,
    driver: UNIVERSITY_DRIVERS_DATA[11],
    tripSchedule: [
      { id: 'trip-25', date: '15 Apr, 2026', timings: '9:30 AM – 4:00 PM', reason: 'Symbiosis Media Village Studio Tour', status: 'Scheduled', faculty: 'Prof. Aarti Deshmukh', contact: '+91 98450 44102', college: 'Institute of Design', passengers: 46 },
      { id: 'trip-26', date: '22 Jan, 2026', timings: '8:00 AM – 5:30 PM', reason: 'Baramati Agro Farm & Dairy Processing Study', status: 'Completed', faculty: 'Dr. Anil Joshi', contact: '+91 97664 11802', college: 'School of Management', passengers: 44 }
    ],
    maintenanceHistory: [
      { date: '19 Feb, 2026', odometer: '32,100 km', reason: 'Brake Drum Skimming & Brake Shoe Replacement', level: 'Preventative', technician: 'Central Workshop Bay 1', cost: '₹9,800', status: 'Completed' },
      { date: '08 Nov, 2025', odometer: '28,400 km', reason: 'Cabin Lighting Wiring Overhaul & Emergency Hammer Restock', level: 'Minor Service', technician: 'Depot Pit 1', cost: '₹2,100', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u13',
    code: 'Bus U-13',
    plate: 'MH12-BB-3023',
    reg: 'Coach #13 • REG-1023',
    model: 'BharatBenz 49 Seater Glider AC',
    capacity: 49,
    status: 'Available',
    odometer: '16,400 km',
    fuel: '94% Diesel (Campus Pump)',
    assignedCorridor: 'Baramati Agro Field Station',
    origin: 'MIT Campus Loni',
    dest: 'Baramati Agro Centre',
    departure: '8:00 AM',
    arrival: '5:30 PM',
    distance: '68.0',
    progressPct: 75,
    driver: UNIVERSITY_DRIVERS_DATA[12],
    tripSchedule: [
      { id: 'trip-27', date: '18 Apr, 2026', timings: '7:00 AM – 7:00 PM', reason: 'Mahabaleshwar Geo-spatial Survey & Mapping Tour', status: 'Scheduled', faculty: 'Dr. Vivek Ranade', contact: '+91 98902 33491', college: 'School of Engineering', passengers: 48 },
      { id: 'trip-28', date: '08 Mar, 2026', timings: '8:30 AM – 5:00 PM', reason: 'International Design Conclave - Hotel Conrad Pune', status: 'Completed', faculty: 'Prof. Harsh Bhawsar', contact: '+91 98450 22391', college: 'Institute of Design', passengers: 42 }
    ],
    maintenanceHistory: [
      { date: '02 Mar, 2026', odometer: '15,000 km', reason: 'Scheduled First Year Comprehensive Warranty Inspection', level: 'Periodic Maintenance', technician: 'BharatBenz Authorized Center', cost: '₹0 (Warranty)', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u14',
    code: 'Bus U-14',
    plate: 'MH12-CC-4024',
    reg: 'Coach #14 • REG-1024',
    model: 'Tata Starbus Ultra 44 Seater AC',
    capacity: 44,
    status: 'Scheduled',
    odometer: '21,500 km',
    fuel: '89% Diesel (Campus Pump)',
    assignedCorridor: 'Sinhagad Fort Trek Trailhead',
    origin: 'MIT Campus Loni',
    dest: 'Sinhagad Trek Base',
    departure: '6:00 AM',
    arrival: '5:00 PM',
    distance: '48.5',
    progressPct: 55,
    driver: UNIVERSITY_DRIVERS_DATA[13],
    tripSchedule: [
      { id: 'trip-29', date: '20 Apr, 2026', timings: '6:00 AM – 5:00 PM', reason: 'Sinhagad Environmental Trek & Ecosystem Documentation', status: 'Scheduled', faculty: 'Dr. Rahul Kulkarni', contact: '+91 98221 44091', college: 'School of Sciences', passengers: 42 },
      { id: 'trip-30', date: '15 Mar, 2026', timings: '7:30 AM – 4:00 PM', reason: 'Katraj Snake Park Zoo Biology Field Trip', status: 'Completed', faculty: 'Prof. Ananya Sen', contact: '+91 98451 88029', college: 'School of Bio-Sciences', passengers: 40 }
    ],
    maintenanceHistory: [
      { date: '10 Feb, 2026', odometer: '20,100 km', reason: 'Routine 20,000 km Oil & Filter Change', level: 'Periodic Maintenance', technician: 'Central Workshop Bay 2', cost: '₹12,800', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u15',
    code: 'Bus U-15',
    plate: 'MH12-DD-5025',
    reg: 'Coach #15 • REG-1025',
    model: 'Ashok Leyland 49 Lynx Smart',
    capacity: 49,
    status: 'Available',
    odometer: '30,200 km',
    fuel: '82% Diesel (Campus Pump)',
    assignedCorridor: 'Alandi Pilgrimage & Cultural Study Hub',
    origin: 'MIT Campus Loni',
    dest: 'Alandi Study Centre',
    departure: '7:30 AM',
    arrival: '6:00 PM',
    distance: '38.0',
    progressPct: 65,
    driver: UNIVERSITY_DRIVERS_DATA[14],
    tripSchedule: [
      { id: 'trip-31', date: '24 Apr, 2026', timings: '8:00 AM – 4:30 PM', reason: 'Alandi Heritage Architecture Field Survey', status: 'Scheduled', faculty: 'Prof. Neha Deshmukh', contact: '+91 97652 11029', college: 'Faculty of Architecture', passengers: 46 }
    ],
    maintenanceHistory: [
      { date: '25 Jan, 2026', odometer: '28,900 km', reason: 'Front Brake Lining Overhaul & Hub Greasing', level: 'Preventative', technician: 'Campus Workshop Bay 1', cost: '₹8,400', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u16',
    code: 'Bus U-16',
    plate: 'MH12-EE-6026',
    reg: 'Coach #16 • REG-1026',
    model: 'BharatBenz 49 Seater Glider AC',
    capacity: 49,
    status: 'Available',
    odometer: '18,800 km',
    fuel: '91% Diesel (Campus Pump)',
    assignedCorridor: 'Hinjawadi IT Cluster Study Hub',
    origin: 'MIT Campus Loni',
    dest: 'Hinjawadi Phase 3',
    departure: '8:00 AM',
    arrival: '4:30 PM',
    distance: '42.0',
    progressPct: 40,
    driver: UNIVERSITY_DRIVERS_DATA[15],
    tripSchedule: [
      { id: 'trip-32', date: '28 Apr, 2026', timings: '8:30 AM – 5:30 PM', reason: 'Infosys Hinjawadi Campus Tech Symposium', status: 'Scheduled', faculty: 'Dr. Sandeep Patil', contact: '+91 98230 77192', college: 'School of Computing', passengers: 48 }
    ],
    maintenanceHistory: [
      { date: '14 Feb, 2026', odometer: '17,200 km', reason: 'Air Conditioning Refrigerant Leak Test & Recharge', level: 'Minor Service', technician: 'Authorized CoolTech', cost: '₹6,500', status: 'Completed' }
    ]
  },
  {
    id: 'bus-u17',
    code: 'Bus U-17',
    plate: 'MH12-FF-7027',
    reg: 'Coach #17 • REG-1027',
    model: 'Force Traveller 26 Seater AC',
    capacity: 26,
    status: 'Available',
    odometer: '14,300 km',
    fuel: '88% Diesel (Internal Pump)',
    assignedCorridor: 'Daund Agri-Tech Incubation Facility',
    origin: 'MIT Campus Loni',
    dest: 'Daund Agri Center',
    departure: '7:00 AM',
    arrival: '5:30 PM',
    distance: '54.0',
    progressPct: 70,
    driver: UNIVERSITY_DRIVERS_DATA[16],
    tripSchedule: [
      { id: 'trip-33', date: '02 May, 2026', timings: '7:00 AM – 6:00 PM', reason: 'Precision Agriculture Sensor Testing Workshop', status: 'Scheduled', faculty: 'Dr. Vivek Ranade', contact: '+91 98902 33491', college: 'School of Engineering', passengers: 24 }
    ],
    maintenanceHistory: [
      { date: '12 Jan, 2026', odometer: '12,800 km', reason: 'First Free Service & General Inspection', level: 'Periodic Maintenance', technician: 'Authorized Force Service Bay', cost: '₹0 (Warranty)', status: 'Completed' }
    ]
  }
];

function getUnivBusRouteMeta(b, idx) {
  const themeColors = ['#F26B1D', '#8B5CF6', '#EA580C', '#0284C7', '#10B981', '#7C3AED', '#F59E0B'];
  const themeColor = themeColors[idx % themeColors.length];

  let origin = b.origin || 'MIT Hostels Loni';
  let dest = b.dest || 'MIT Campus Loni';
  let departure = b.departure || '7:00 AM';
  let arrival = b.arrival || '8:30 AM';
  let distance = b.distance || '12.4';
  let progressPct = b.progressPct !== undefined ? b.progressPct : (50 + ((idx * 7) % 35));
  let vehicleImg = 'buses.png';

  return { origin, dest, departure, arrival, distance, progressPct, themeColor, vehicleImg };
}

function renderUniversityBuses() {
  const container = document.getElementById('univBusesContainer');
  if (!container) return;

  // Update Top KPIs dynamically
  const totalCount = UNIVERSITY_BUSES_DATA.length;
  const availableCount = UNIVERSITY_BUSES_DATA.filter(b => (b.status || '').toLowerCase() === 'available').length;
  const scheduledCount = UNIVERSITY_BUSES_DATA.filter(b => (b.status || '').toLowerCase() === 'scheduled').length;
  const maintenanceCount = UNIVERSITY_BUSES_DATA.filter(b => (b.status || '').toLowerCase().includes('maint')).length;

  const kpiTot = document.getElementById('kpiTotalUnivBuses');
  if (kpiTot) kpiTot.textContent = totalCount;
  const kpiAvail = document.getElementById('kpiAvailableUnivBuses');
  if (kpiAvail) kpiAvail.textContent = availableCount;
  const kpiSched = document.getElementById('kpiActiveTripsCount');
  if (kpiSched) kpiSched.textContent = scheduledCount;
  const kpiMaint = document.getElementById('kpiMaintenanceUnivBuses');
  if (kpiMaint) kpiMaint.textContent = maintenanceCount;

  // Update filter pills text without numbers
  const pillAll = document.getElementById('btnFilterUnivAll');
  if (pillAll) pillAll.textContent = 'All';
  const pillAvail = document.getElementById('btnFilterUnivAvail');
  if (pillAvail) pillAvail.textContent = 'Available';
  const pillSched = document.getElementById('btnFilterUnivSched');
  if (pillSched) pillSched.textContent = 'Scheduled';
  const pillMaint = document.getElementById('btnFilterUnivMaint');
  if (pillMaint) pillMaint.textContent = 'Maintenance';

  const q = (document.getElementById('univBusSearchInput')?.value || '').toLowerCase().trim();
  const filter = AppState.univBusFilter || 'all';

  const filtered = UNIVERSITY_BUSES_DATA.filter(b => {
    const bStatus = (b.status || 'Available').toLowerCase();
    const filterLower = filter.toLowerCase();
    const matchesFilter = filter === 'all' || 
      bStatus === filterLower || 
      (filterLower.includes('maint') && bStatus.includes('maint'));
    const matchesQuery = !q ||
      b.code.toLowerCase().includes(q) ||
      b.plate.toLowerCase().includes(q) ||
      b.model.toLowerCase().includes(q) ||
      (b.origin && b.origin.toLowerCase().includes(q)) ||
      (b.dest && b.dest.toLowerCase().includes(q)) ||
      b.status.toLowerCase().includes(q) ||
      b.assignedCorridor.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 36px; color: var(--text-muted); border: 1px solid var(--border); border-radius: var(--radius-card); background: var(--surface);">
        <i class="ph ph-bus" style="font-size: 28px; color: var(--text-muted); margin-bottom: 8px; display: block;"></i>
        <div>No university buses match your search or filter.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((b, idx) => {
    const meta = getUnivBusRouteMeta(b, idx);
    const statusNormalized = (b.status || 'Available').toLowerCase();
    let statusClass = 'available';
    let statusDotClass = 'available';
    let displayStatus = 'Available';
    if (statusNormalized.includes('maint')) {
      statusClass = 'maintenance';
      statusDotClass = 'maintenance';
      displayStatus = 'Maintenance';
    } else if (statusNormalized.includes('sched')) {
      statusClass = 'scheduled';
      statusDotClass = 'scheduled';
      displayStatus = 'Scheduled';
    }

    // Distance rule: if scheduled, show km; if available or maintenance, show 0 km
    const displayDistance = (displayStatus === 'Scheduled') ? `${meta.distance} km` : '0 km';

    return `
      <div class="univ-bus-card" onclick="openBusDetail('${b.id}')" title="Click to inspect bus schedule & history">
        <!-- Top: ID on Left (Driver name removed), Vehicle Image on Right -->
        <div class="bus-card-head">
          <div class="bus-card-id-grp">
            <span class="bus-card-code">${b.plate || b.code}</span>
            <span class="bus-card-sub-type">${b.assignedCorridor || b.model}</span>
          </div>
          <div class="bus-card-vehicle-box">
            <img src="${meta.vehicleImg}" alt="${b.model}" class="bus-card-vehicle-img">
          </div>
        </div>

        <!-- Middle: MIT Hostel / Field Visit / Trekking Destinations -->
        <div class="bus-card-route-section">
          <div class="bus-card-route-endpoints">
            <span class="route-city origin">${meta.origin}</span>
            <span class="route-city destination">${meta.dest}</span>
          </div>

          <!-- Progress Track with Slider Pill -->
          <div class="track-progress-wrapper" style="--track-color: ${meta.themeColor};">
            <div class="track-dot origin"></div>
            <div class="track-line-solid" style="width: ${meta.progressPct}%;"></div>
            <div class="track-vehicle-pill"></div>
            <div class="track-line-dotted"></div>
            <div class="track-dot dest"></div>
          </div>

          <div class="bus-card-route-times">
            <span class="route-time origin">${meta.departure}</span>
            <span class="route-time destination">${meta.arrival}</span>
          </div>
        </div>

        <!-- Bottom: Seating Capacity, Status (Maintenance / Available / Scheduled), Distance -->
        <div class="bus-card-metrics-strip">
          <div class="bus-card-metric-cell" title="Total Seating Capacity">
            <i class="ph ph-armchair"></i>
            <span>${b.capacity || 49} Seats</span>
          </div>
          <div class="card-metric-divider"></div>
          <div class="bus-card-metric-cell status-cell ${statusClass}" title="Status: ${displayStatus}">
            <span class="bus-status-indicator-dot ${statusDotClass}"></span>
            <span>${displayStatus}</span>
          </div>
          <div class="card-metric-divider"></div>
          <div class="bus-card-metric-cell" title="One-Way Distance">
            <i class="ph ph-map-pin"></i>
            <span>${displayDistance}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderUniversityDrivers() {
  const container = document.getElementById('univDriversContainer');
  if (!container) return;

  const q = (document.getElementById('univDriverSearchInput')?.value || '').toLowerCase().trim();

  const filtered = UNIVERSITY_DRIVERS_DATA.filter(d => {
    return !q ||
      d.name.toLowerCase().includes(q) ||
      d.empId.toLowerCase().includes(q) ||
      d.phone.includes(q) ||
      (d.license && d.license.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 36px; color: var(--text-muted); border: 1px solid var(--border); border-radius: var(--radius-card); background: var(--surface);">
        <div>No university drivers match your search.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(d => {
    return `
      <div class="univ-driver-card">
        <div>
          <!-- Header with Avatar, Name, Emp ID & Phone -->
          <div class="univ-driver-header">
            <img src="${d.photo}" alt="${d.name}" class="univ-driver-avatar">
            <div class="univ-driver-info">
              <div class="univ-driver-title">${d.name}</div>
              <div class="univ-driver-empid">Emp ID: ${d.empId}</div>
              <a href="tel:${d.phone}" class="univ-driver-phone-link" onclick="event.stopPropagation(); triggerCall('${d.phone}')">
                <i class="ph ph-phone"></i> ${d.phone}
              </a>
            </div>
          </div>

          <!-- 3-Column Clean Metrics Strip: Experience, Attendance, Rating (No Assigned Bus, No Duty Roster) -->
          <div class="univ-driver-stats-strip" style="margin-top: 14px;">
            <div class="univ-driver-stat-col">
              <span class="univ-driver-stat-label">Experience</span>
              <span class="univ-driver-stat-val">${d.exp}</span>
            </div>
            <div class="univ-driver-stat-col">
              <span class="univ-driver-stat-label">Attendance</span>
              <span class="univ-driver-stat-val">${d.attendance.split(' ')[0]}</span>
              <span class="univ-driver-stat-sub">${d.attendance.includes('(') ? d.attendance.split('(')[1].replace(')', '') : 'Monthly'}</span>
            </div>
            <div class="univ-driver-stat-col">
              <span class="univ-driver-stat-label">Rating</span>
              <span class="univ-driver-stat-val accent">${d.rating.split(' ')[0]}</span>
              <span class="univ-driver-stat-sub">/ 5.0 Safety</span>
            </div>
          </div>
        </div>

        <!-- Footer with Call & Chat Action Buttons (Labeled 'Chat') -->
        <div class="univ-driver-footer">
          <a href="tel:${d.phone}" class="btn-driver-call" onclick="event.stopPropagation(); triggerCall('${d.phone}')">
            <i class="ph ph-phone-call"></i> Call
          </a>
          <button class="btn-driver-chat" onclick="navigateTo('chat'); selectChatByName('${d.name}')">
            <i class="ph ph-chat-circle"></i> Chat
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openBusDetail(busId) {
  AppState.currentBusDetailId = busId;
  renderBusDetail(busId);
  navigateTo('bus-detail');
  playProminentSound('success');
  const bus = UNIVERSITY_BUSES_DATA.find(b => b.id === busId);
  if (bus) {
    triggerToast(`Viewing full schedule & maintenance for ${bus.code} (${bus.plate})`, 'info');
  }
}

function renderBusDetail(busId) {
  const bus = UNIVERSITY_BUSES_DATA.find(b => b.id === busId) || UNIVERSITY_BUSES_DATA[0];
  if (!bus) return;

  AppState.currentBusDetailId = bus.id;

  // Header Title, Breadcrumb & Badges
  const titleEl = document.getElementById('bdBusTitle');
  const breadcrumbCurrent = document.getElementById('bdBreadcrumbCurrent');
  const busDisplayTitle = `${bus.code} • ${bus.plate}`;

  if (titleEl) titleEl.textContent = busDisplayTitle;
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = busDisplayTitle;

  const statusBadge = document.getElementById('bdBusStatusBadge');
  if (statusBadge) {
    const isOp = bus.status === 'Operational';
    const isSched = bus.status === 'Scheduled';
    const isSpecial = bus.status === 'Booked for Special Trip';
    const statusClass = (isOp || isSched) ? 'operational' : isSpecial ? 'warning' : 'danger';
    statusBadge.className = `inside-status-badge ${statusClass}`;
    statusBadge.innerHTML = `
      <span class="inside-status-dot"></span>
      <span class="inside-status-label">${bus.status}</span>
    `;
  }

  const subEl = document.getElementById('bdBusSubtitle');
  if (subEl) {
    subEl.innerHTML = `
      <span class="meta-item"><i class="ph ph-bus"></i> <span>${bus.model}</span></span>
      <span class="meta-sep">•</span>
      <span class="meta-item"><i class="ph ph-navigation-arrow"></i> <span>Corridor: <strong>${bus.assignedCorridor}</strong></span></span>
    `;
  }

  const callBtn = document.getElementById('bdCallDriverBtn');
  if (callBtn) {
    callBtn.setAttribute('onclick', `triggerCall('${bus.driver.phone}')`);
    callBtn.innerHTML = `<i class="ph ph-phone"></i> Call Driver (${bus.driver.name})`;
  }

  // Summary KPI Strip Counters & Badges
  const totalTripsCount = (bus.tripSchedule || []).length;
  const totalPassengers = (bus.tripSchedule || []).reduce((acc, t) => acc + (parseInt(t.passengers) || 0), 0);
  const totalMaintCount = (bus.maintenanceHistory || []).length;

  const sumTripsEl = document.getElementById('bdSummaryTripsCount');
  if (sumTripsEl) sumTripsEl.textContent = `${totalTripsCount} Trip${totalTripsCount === 1 ? '' : 's'}`;

  const sumPassEl = document.getElementById('bdSummaryPassengersCount');
  if (sumPassEl) sumPassEl.textContent = `${totalPassengers} Passengers`;

  const sumMaintEl = document.getElementById('bdSummaryMaintCount');
  if (sumMaintEl) sumMaintEl.textContent = `${totalMaintCount} Service${totalMaintCount === 1 ? '' : 's'}`;

  const sumOdoEl = document.getElementById('bdSummaryOdometer');
  if (sumOdoEl) sumOdoEl.textContent = bus.odometer || '38,400 km';

  const tabTripCount = document.getElementById('bdTripTabCount');
  if (tabTripCount) tabTripCount.textContent = totalTripsCount;

  const tabMaintCount = document.getElementById('bdMaintTabCount');
  if (tabMaintCount) tabMaintCount.textContent = totalMaintCount;

  const tripBadge = document.getElementById('bdTripTableCountBadge');
  if (tripBadge) tripBadge.textContent = `${totalTripsCount} Record${totalTripsCount === 1 ? '' : 's'}`;

  const maintBadge = document.getElementById('bdMaintTableCountBadge');
  if (maintBadge) maintBadge.textContent = `${totalMaintCount} Record${totalMaintCount === 1 ? '' : 's'}`;

  // Reset table search & filter controls
  const tripSearch = document.getElementById('bdTripSearchInput');
  if (tripSearch) tripSearch.value = '';
  const tripStatusFilter = document.getElementById('bdTripStatusFilter');
  if (tripStatusFilter) tripStatusFilter.value = 'all';

  const maintSearch = document.getElementById('bdMaintSearchInput');
  if (maintSearch) maintSearch.value = '';
  const maintLevelFilter = document.getElementById('bdMaintLevelFilter');
  if (maintLevelFilter) maintLevelFilter.value = 'all';

  // Render both organized tables
  renderBusTripsTable(bus);
  renderBusMaintTable(bus);
}

// -----------------------------------------------------------------------------
// ORGANIZED TRIP SCHEDULE & MAINTENANCE TABLE RENDERERS AND FILTERS
// -----------------------------------------------------------------------------

function renderBusTripsTable(bus, filterText = '', statusFilter = 'all') {
  const tripTbody = document.getElementById('bdTripScheduleTableBody');
  if (!tripTbody) return;

  let trips = bus.tripSchedule || [];
  if (filterText) {
    const q = filterText.toLowerCase();
    trips = trips.filter(t => 
      (t.reason && t.reason.toLowerCase().includes(q)) ||
      (t.faculty && t.faculty.toLowerCase().includes(q)) ||
      (t.college && t.college.toLowerCase().includes(q)) ||
      (t.date && t.date.toLowerCase().includes(q)) ||
      (t.timings && t.timings.toLowerCase().includes(q))
    );
  }
  if (statusFilter && statusFilter !== 'all') {
    trips = trips.filter(t => (t.status || '').toLowerCase() === statusFilter.toLowerCase());
  }

  const badgeEl = document.getElementById('bdTripTableCountBadge');
  if (badgeEl) badgeEl.textContent = `${trips.length} Record${trips.length === 1 ? '' : 's'}`;

  if (trips.length === 0) {
    tripTbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 36px 16px;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <i class="ph ph-calendar-x" style="font-size: 28px; opacity: 0.5;"></i>
            <span style="font-weight: 500;">No trips found matching the selected filter criteria</span>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tripTbody.innerHTML = trips.map(t => {
    let statusPill = '';
    const st = (t.status || '').toLowerCase();
    if (st === 'completed') {
      statusPill = `<span class="badge-clean operational">Completed</span>`;
    } else if (st === 'scheduled' || st === 'booked') {
      statusPill = `<span class="badge-clean warning">Scheduled</span>`;
    } else if (st.includes('progress')) {
      statusPill = `<span class="badge-clean active">In Progress</span>`;
    } else {
      statusPill = `<span class="badge-clean">${t.status}</span>`;
    }

    return `
      <tr>
        <td>
          <div class="cell-main-date">${t.date}</div>
          <div class="cell-time"><i class="ph ph-clock"></i> ${t.timings}</div>
        </td>
        <td>
          <div class="cell-trip-reason">${t.reason}</div>
        </td>
        <td>${statusPill}</td>
        <td>
          <div class="cell-faculty">${t.faculty}</div>
          <a href="tel:${t.contact}" class="cell-contact-link">
            <i class="ph ph-phone"></i> ${t.contact}
          </a>
        </td>
        <td>
          <span class="badge-college">${t.college}</span>
        </td>
        <td style="text-align: center;">
          <span class="badge-passengers"><i class="ph ph-users"></i> ${t.passengers}</span>
        </td>
      </tr>
    `;
  }).join('');
}

function renderBusMaintTable(bus, filterText = '', levelFilter = 'all') {
  const maintTbody = document.getElementById('bdMaintenanceTableBody');
  if (!maintTbody) return;

  let maint = bus.maintenanceHistory || [];
  if (filterText) {
    const q = filterText.toLowerCase();
    maint = maint.filter(m =>
      (m.reason && m.reason.toLowerCase().includes(q)) ||
      (m.technician && m.technician.toLowerCase().includes(q)) ||
      (m.level && m.level.toLowerCase().includes(q)) ||
      (m.date && m.date.toLowerCase().includes(q))
    );
  }
  if (levelFilter && levelFilter !== 'all') {
    maint = maint.filter(m => (m.level || '').toLowerCase().includes(levelFilter.toLowerCase()));
  }

  const badgeEl = document.getElementById('bdMaintTableCountBadge');
  if (badgeEl) badgeEl.textContent = `${maint.length} Record${maint.length === 1 ? '' : 's'}`;

  if (maint.length === 0) {
    maintTbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 36px 16px;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <i class="ph ph-wrench" style="font-size: 28px; opacity: 0.5;"></i>
            <span style="font-weight: 500;">No maintenance logs match the selected filter criteria</span>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  maintTbody.innerHTML = maint.map(m => {
    const lvl = (m.level || '').toLowerCase();
    let levelHtml = '';
    if (lvl.includes('periodic')) {
      levelHtml = `<span class="badge-service-level periodic"><i class="ph ph-arrows-clockwise"></i> ${m.level}</span>`;
    } else if (lvl.includes('overhaul') || lvl.includes('urgent') || lvl.includes('major')) {
      levelHtml = `<span class="badge-service-level major"><i class="ph ph-warning-circle"></i> ${m.level}</span>`;
    } else {
      levelHtml = `<span class="badge-service-level"><i class="ph ph-wrench"></i> ${m.level}</span>`;
    }

    const st = (m.status || '').toLowerCase();
    let statusPill = '';
    if (st === 'completed') {
      statusPill = `<span class="badge-clean operational">Completed</span>`;
    } else {
      statusPill = `<span class="badge-clean warning">${m.status}</span>`;
    }

    return `
      <tr>
        <td>
          <div class="cell-main-date">${m.date}</div>
          <div class="cell-odometer"><i class="ph ph-gauge"></i> ${m.odometer}</div>
        </td>
        <td>
          <div class="cell-maint-reason">${m.reason}</div>
        </td>
        <td>${levelHtml}</td>
        <td>
          <div class="cell-depot">
            <i class="ph ph-buildings" style="color:var(--text-muted); font-size:14px;"></i>
            <span>${m.technician}</span>
          </div>
        </td>
        <td>${statusPill}</td>
        <td style="text-align: right;">
          <span class="cell-cost-pill">${m.cost}</span>
        </td>
      </tr>
    `;
  }).join('');
}

function filterBusTrips() {
  const bus = UNIVERSITY_BUSES_DATA.find(b => b.id === AppState.currentBusDetailId) || UNIVERSITY_BUSES_DATA[0];
  if (!bus) return;
  const search = document.getElementById('bdTripSearchInput')?.value || '';
  const status = document.getElementById('bdTripStatusFilter')?.value || 'all';
  renderBusTripsTable(bus, search, status);
}

function filterBusMaint() {
  const bus = UNIVERSITY_BUSES_DATA.find(b => b.id === AppState.currentBusDetailId) || UNIVERSITY_BUSES_DATA[0];
  if (!bus) return;
  const search = document.getElementById('bdMaintSearchInput')?.value || '';
  const level = document.getElementById('bdMaintLevelFilter')?.value || 'all';
  renderBusMaintTable(bus, search, level);
}

function switchBusDetailTab(tab) {
  const btnTrips = document.getElementById('tabBtnTrips');
  const btnMaint = document.getElementById('tabBtnMaint');
  const btnBoth = document.getElementById('tabBtnBoth');
  const cardTrips = document.getElementById('cardTripSchedule');
  const cardMaint = document.getElementById('cardMaintenanceLog');

  [btnTrips, btnMaint, btnBoth].forEach(b => { if (b) b.classList.remove('active'); });

  if (tab === 'trips') {
    if (btnTrips) btnTrips.classList.add('active');
    if (cardTrips) cardTrips.style.display = 'block';
    if (cardMaint) cardMaint.style.display = 'none';
  } else if (tab === 'maint') {
    if (btnMaint) btnMaint.classList.add('active');
    if (cardTrips) cardTrips.style.display = 'none';
    if (cardMaint) cardMaint.style.display = 'block';
  } else {
    if (btnBoth) btnBoth.classList.add('active');
    if (cardTrips) cardTrips.style.display = 'block';
    if (cardMaint) cardMaint.style.display = 'block';
  }
}

function setUnivBusFilter(status, btn) {
  AppState.univBusFilter = status;
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderUniversityBuses();
}

function filterUniversityBuses() {
  renderUniversityBuses();
}

function filterUniversityDrivers() {
  renderUniversityDrivers();
}

function openNewTripModalForCurrentBus() {
  const select = document.getElementById('tripBusSelect');
  if (select && AppState.currentBusDetailId) {
    select.value = AppState.currentBusDetailId;
  }
  openNewTripModal();
}

function logNewMaintenancePrompt() {
  const bus = UNIVERSITY_BUSES_DATA.find(b => b.id === AppState.currentBusDetailId) || UNIVERSITY_BUSES_DATA[0];
  if (!bus) return;

  const reason = prompt(`Enter Maintenance Reason / Scope for ${bus.code} (${bus.plate}):`, 'Brake Pad Replacement & Hydraulic Inspection');
  if (!reason) return;

  const level = prompt('Enter Level of Maintenance (Minor Service / Periodic Maintenance / Preventative / Major Overhaul):', 'Periodic Maintenance') || 'Periodic Maintenance';
  const cost = prompt('Estimated Maintenance Cost (₹):', '8500') || '8500';

  const newLog = {
    date: 'Today (' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ')',
    odometer: bus.odometer,
    reason: reason,
    level: level,
    technician: 'Campus Central Workshop Bay 1',
    cost: '₹' + cost,
    status: 'In Progress'
  };

  bus.maintenanceHistory.unshift(newLog);
  bus.status = 'In Maintenance';
  renderUniversityBuses();
  updateUnivKPIs();
  renderBusDetail(bus.id);
  playProminentSound('success');
  triggerToast(`Maintenance record logged for ${bus.code} (${level})`, 'success');
}

function populateTripBusSelect() {
  const select = document.getElementById('tripBusSelect');
  if (!select) return;

  select.innerHTML = UNIVERSITY_BUSES_DATA.map(b => `
    <option value="${b.id}" ${b.id === AppState.currentBusDetailId ? 'selected' : ''}>
      ${b.code} (${b.plate}) • ${b.capacity} Seats • ${b.status}
    </option>
  `).join('');
}

function updateUnivKPIs() {
  const total = UNIVERSITY_BUSES_DATA.length;
  const avail = UNIVERSITY_BUSES_DATA.filter(b => (b.status || '').toLowerCase() === 'available').length;
  const booked = UNIVERSITY_BUSES_DATA.filter(b => (b.status || '').toLowerCase() === 'scheduled').length;
  const maint = UNIVERSITY_BUSES_DATA.filter(b => (b.status || '').toLowerCase().includes('maint')).length;

  const totalEl = document.getElementById('kpiTotalUnivBuses');
  if (totalEl) totalEl.textContent = total;

  const availEl = document.getElementById('kpiAvailableUnivBuses');
  if (availEl) availEl.textContent = avail;

  const bookedEl = document.getElementById('kpiActiveTripsCount');
  if (bookedEl) bookedEl.textContent = booked;

  const maintEl = document.getElementById('kpiMaintenanceUnivBuses');
  if (maintEl) maintEl.textContent = maint;

  const pillAll = document.getElementById('btnFilterUnivAll');
  if (pillAll) pillAll.textContent = 'All';
  const pillAvail = document.getElementById('btnFilterUnivAvail');
  if (pillAvail) pillAvail.textContent = 'Available';
  const pillSched = document.getElementById('btnFilterUnivSched');
  if (pillSched) pillSched.textContent = 'Scheduled';
  const pillMaint = document.getElementById('btnFilterUnivMaint');
  if (pillMaint) pillMaint.textContent = 'Maintenance';
}

function selectChatByName(name) {
  AppState.activeChatRecipient = name;
  const target = document.getElementById('activeChatName');
  if (target) target.textContent = name;
  renderChatConversations();
}

function renderFleetInventory() {
  // Legacy stub maintained for compatibility
  renderUniversityBuses();
}

// =============================================================================
// CHAT MESSENGER & DISPATCH DATASET (GROUPS & DIRECT DIFFERENTIATION)
// =============================================================================

const CHAT_DATA = [
  // 1. BROADCAST & OPERATIONAL GROUPS
  {
    id: 'grp-all-drivers',
    name: 'All Drivers Broadcast',
    type: 'group',
    category: 'driver',
    membersCount: 13,
    time: '8:30 AM',
    lastMsg: 'Weather alert - light rain near Loni. Safe spacing.',
    unread: false,
    important: true,
    messages: [
      { sender: 'admin', text: 'Daily Briefing: Speed limits strictly enforced at 60 km/h telematics ceiling. Drive cautiously.', time: '7:00 AM' },
      { sender: 'driver', senderName: 'Santosh (Bus U-01)', text: 'Nigdi corridor clear. All 42 students on board.', time: '7:45 AM' },
      { sender: 'driver', senderName: 'Arun (Bus E)', text: 'Lohegaon route moving on schedule through Phoenix bypass.', time: '8:10 AM' },
      { sender: 'admin', text: 'Weather alert - light rain expected near Loni. Maintain safe spacing.', time: '8:30 AM' }
    ]
  },
  {
    id: 'grp-morning-shift',
    name: 'Morning Shift Operations',
    type: 'group',
    category: 'driver',
    membersCount: 8,
    time: '7:55 AM',
    lastMsg: 'Vijay (Bus B): Chaphekar bus crossed Baner phata.',
    unread: true,
    important: true,
    messages: [
      { sender: 'driver', senderName: 'Ramesh (Bus D)', text: 'Moshi bus departed 6:50 AM.', time: '6:52 AM' },
      { sender: 'driver', senderName: 'Vijay (Bus B)', text: 'Chaphekar bus crossed Baner phata.', time: '7:55 AM' }
    ]
  },
  {
    id: 'grp-special-trips',
    name: 'Special Charter & Visits',
    type: 'group',
    category: 'coordinator',
    membersCount: 5,
    time: 'Yesterday',
    lastMsg: 'Admin: Bus U-03 booked for Baramati ISRO trip on 31 Mar.',
    unread: false,
    important: false,
    messages: [
      { sender: 'admin', text: 'Bus U-03 booked for Baramati ISRO trip on 31 Mar. Driver Dattatray assigned.', time: 'Yesterday' },
      { sender: 'coordinator', senderName: 'Prof. Harsh Bhawsar', text: 'Received vehicle readiness checklist. Faculty roster attached.', time: 'Yesterday' }
    ]
  },

  // 2. COORDINATORS
  {
    id: 'coord-harsh',
    name: 'Prof. Harsh Bhawsar',
    type: 'direct',
    category: 'coordinator',
    role: 'Faculty Coordinator • School of Engineering',
    time: '9:40 AM',
    lastMsg: 'Requested 2 extra buses for Chakan industrial tour.',
    unread: true,
    important: true,
    phone: '+91 98450 22391',
    messages: [
      { sender: 'coordinator', text: 'Good morning CTD Admin, we have 44 mechanical engineering students attending the Tata Motors Chakan visit next Monday.', time: '9:30 AM' },
      { sender: 'admin', text: 'Noted Prof. Bhawsar. Bus U-01 is scheduled with departure at 8:30 AM from campus gate.', time: '9:35 AM' },
      { sender: 'coordinator', text: 'Requested 2 extra buses for Chakan industrial tour.', time: '9:40 AM' }
    ]
  },
  {
    id: 'coord-sarah',
    name: 'Dr. Sarah Miller',
    type: 'direct',
    category: 'coordinator',
    role: 'Department Coordinator • School of Design',
    time: 'Yesterday',
    lastMsg: 'ARAI tech expo student list approved.',
    unread: false,
    important: false,
    phone: '+91 91234 56789',
    messages: [
      { sender: 'coordinator', text: 'Hi Admin, sharing the passenger roster for ARAI tech expo.', time: 'Yesterday' },
      { sender: 'admin', text: 'Roster received. Bus U-04 assigned with 40 seats.', time: 'Yesterday' },
      { sender: 'coordinator', text: 'ARAI tech expo student list approved.', time: 'Yesterday' }
    ]
  },
  {
    id: 'coord-patil',
    name: 'Dr. Rajesh Patil',
    type: 'direct',
    category: 'coordinator',
    role: 'Academic Transit Lead • School of Computing',
    time: '22 Jan',
    lastMsg: 'Faculty research conclave timing confirmed.',
    unread: false,
    important: false,
    phone: '+91 98220 11984',
    messages: [
      { sender: 'coordinator', text: 'Please ensure return bus is available at 6:00 PM after concluding remarks.', time: '22 Jan' },
      { sender: 'admin', text: 'Confirmed. Return trip scheduled at 6:00 PM sharp.', time: '22 Jan' },
      { sender: 'coordinator', text: 'Faculty research conclave timing confirmed.', time: '22 Jan' }
    ]
  },

  // 3. DIRECT DRIVER MESSAGES
  {
    id: 'dm-santosh',
    name: 'Santosh Jadhav (Bus U-01)',
    type: 'direct',
    category: 'driver',
    role: 'Nigdi Corridor • Heavy Transport',
    time: '8:20 AM',
    lastMsg: 'Approaching Dapodi bridge, 42 students on board.',
    unread: true,
    important: true,
    phone: '+91 83368 18273',
    messages: [
      { sender: 'admin', text: 'Santosh, please verify smart pass count at Chinchwad stop.', time: '7:15 AM' },
      { sender: 'driver', text: 'Count verified: 42 students. All passes scanned.', time: '7:18 AM' },
      { sender: 'driver', text: 'Approaching Dapodi bridge, 42 students on board.', time: '8:20 AM' }
    ]
  },
  {
    id: 'dm-arun',
    name: 'Arun Patil (Bus E)',
    type: 'direct',
    category: 'driver',
    role: 'Lohegaon Corridor • Regular Transit',
    time: '8:05 AM',
    lastMsg: 'Passed Novotel stop. Next stop Phoenix Mall.',
    unread: false,
    important: false,
    phone: '+91 98474 32984',
    messages: [
      { sender: 'driver', text: 'Lohegaon pickup completed with 39 passengers.', time: '7:30 AM' },
      { sender: 'admin', text: 'GPS telemetry synced. Maintain 45 km/h.', time: '7:35 AM' },
      { sender: 'driver', text: 'Passed Novotel stop. Next stop Phoenix Mall.', time: '8:05 AM' }
    ]
  },
  {
    id: 'dm-ganesh',
    name: 'Ganesh More (Bus U-02)',
    type: 'direct',
    category: 'driver',
    role: 'Central Workshop Standby',
    time: 'Yesterday',
    lastMsg: 'Clutch overhaul started in Bay 3.',
    unread: false,
    important: true,
    phone: '+91 98112 34567',
    messages: [
      { sender: 'admin', text: 'Bus U-02 scheduled for clutch inspection this afternoon.', time: 'Yesterday' },
      { sender: 'driver', text: 'Clutch overhaul started in Bay 3. Parts delivered.', time: 'Yesterday' }
    ]
  },
  {
    id: 'dm-ramesh',
    name: 'Ramesh Shinde (Bus D)',
    type: 'direct',
    category: 'driver',
    role: 'Moshi Spine Road Corridor',
    time: '7:42 AM',
    lastMsg: 'Smooth traffic at Sangamwadi bypass.',
    unread: false,
    important: false,
    phone: '+91 98555 43210',
    messages: [
      { sender: 'driver', text: 'Smooth traffic at Sangamwadi bypass.', time: '7:42 AM' }
    ]
  },
  {
    id: 'dm-sunil',
    name: 'Sunil Verma (Bus M)',
    type: 'direct',
    category: 'driver',
    role: 'Tarawade Logistics Fleet',
    time: '9:15 AM',
    lastMsg: 'Issue noted. Proceeding to depot for checkup.',
    unread: false,
    important: false,
    phone: '+91 98765 43210',
    messages: [
      { sender: 'admin', text: 'Sunil, check AC cooling in rear row for coach 14.', time: '8:45 AM' },
      { sender: 'driver', text: 'Issue noted. Proceeding to depot for checkup.', time: '9:15 AM' }
    ]
  }
];

function setChatFilter(filter, btn) {
  AppState.chatFilter = filter;
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderChatConversations();
}

function renderChatConversations() {
  const list = document.getElementById('chatConversationsList');
  if (!list) return;

  const q = (document.getElementById('chatSearchInput')?.value || '').toLowerCase().trim();
  const filter = AppState.chatFilter || 'all';

  const filtered = CHAT_DATA.filter(c => {
    let matchFilter = true;
    if (filter === 'drivers') {
      matchFilter = c.category === 'driver' || (c.role && c.role.toLowerCase().includes('driver')) || c.id.startsWith('dm-') || c.id === 'grp-all-drivers' || c.id === 'grp-morning-shift';
    } else if (filter === 'coordinators') {
      matchFilter = c.category === 'coordinator' || (c.role && c.role.toLowerCase().includes('coordinator')) || c.id.startsWith('coord-') || c.id === 'grp-special-trips';
    }

    const matchQ = !q || c.name.toLowerCase().includes(q) || (c.lastMsg && c.lastMsg.toLowerCase().includes(q));
    return matchFilter && matchQ;
  });

  if (filtered.length === 0) {
    list.innerHTML = `
      <div style="padding: 24px 16px; text-align: center; color: var(--text-muted); font-size: 12px;">
        <i class="ph ph-chat-circle-slash" style="font-size: 24px; color: var(--text-muted); margin-bottom: 6px; display: block;"></i>
        <div>No ${filter !== 'all' ? filter : ''} messages found.</div>
      </div>
    `;
    return;
  }

  const renderCard = (c) => {
    const isGroup = c.type === 'group';
    const isCoord = c.category === 'coordinator';
    let avatarHtml = '';
    if (isGroup) {
      avatarHtml = `<div class="chat-item-avatar group" title="Broadcast Group"><i class="ph ph-users"></i></div>`;
    } else if (isCoord) {
      avatarHtml = `<div class="chat-item-avatar direct" style="background: #EFF6FF; color: #2563EB; border-color: #BFDBFE;" title="Faculty Coordinator"><i class="ph ph-graduation-cap"></i></div>`;
    } else {
      avatarHtml = `<div class="chat-item-avatar direct" title="Direct Driver">${c.name.split(' ')[0][0]}</div>`;
    }

    const unreadDot = c.unread ? `<span class="chat-unread-dot" title="Unread Message"></span>` : '';

    return `
      <div class="chat-item-flat ${c.name === AppState.activeChatRecipient ? 'active' : ''}" onclick="selectChat('${c.id}')">
        ${avatarHtml}
        <div style="flex-grow: 1; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 500; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500;">${c.name}</span>
            </div>
            <span style="font-size: 11px; color: var(--text-muted); font-weight: 400; flex-shrink: 0; margin-left: 6px;">${c.time}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 12px; color: ${c.unread ? 'var(--text-primary)' : 'var(--text-muted)'}; font-weight: ${c.unread ? '500' : '400'}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${c.lastMsg}</div>
            ${unreadDot}
          </div>
        </div>
      </div>
    `;
  };

  let html = '';
  if (filter === 'all') {
    const groups = filtered.filter(c => c.type === 'group');
    const coords = filtered.filter(c => c.category === 'coordinator' && c.type !== 'group');
    const drivers = filtered.filter(c => c.category === 'driver' && c.type !== 'group');

    if (groups.length > 0) {
      html += `<div class="chat-section-divider-title">Broadcast Channels</div>`;
      html += groups.map(renderCard).join('');
    }
    if (coords.length > 0) {
      html += `<div class="chat-section-divider-title" style="margin-top: 10px;">Coordinators & Faculty</div>`;
      html += coords.map(renderCard).join('');
    }
    if (drivers.length > 0) {
      html += `<div class="chat-section-divider-title" style="margin-top: 10px;">Fleet Drivers</div>`;
      html += drivers.map(renderCard).join('');
    }
  } else if (filter === 'drivers') {
    html += `<div class="chat-section-divider-title">Drivers & Road Operations (${filtered.length})</div>`;
    html += filtered.map(renderCard).join('');
  } else if (filter === 'coordinators') {
    html += `<div class="chat-section-divider-title">Faculty & Institutional Coordinators (${filtered.length})</div>`;
    html += filtered.map(renderCard).join('');
  }

  list.innerHTML = html;
}

function selectChat(id) {
  const conv = CHAT_DATA.find(c => c.id === id) || CHAT_DATA[0];
  AppState.activeChatRecipient = conv.name;
  conv.unread = false;

  const nameEl = document.getElementById('activeChatName');
  if (nameEl) nameEl.textContent = conv.name;

  const subEl = document.getElementById('activeChatSub');
  if (subEl) {
    if (conv.type === 'group') {
      subEl.textContent = `● Broadcast Channel • Monitored by Dispatch Control Room`;
    } else if (conv.category === 'coordinator') {
      subEl.textContent = `● ${conv.role || 'Department Transport Coordinator'}`;
    } else {
      subEl.textContent = `● Active on Route • ${conv.role || 'Campus Heavy Transport'}`;
    }
  }

  const callBtn = document.getElementById('activeChatCallBtn');
  if (callBtn) {
    if (conv.phone) {
      callBtn.style.display = 'inline-flex';
      callBtn.setAttribute('onclick', `triggerCall('${conv.phone}')`);
      callBtn.innerHTML = `<i class="ph ph-phone"></i> Call ${conv.category === 'coordinator' ? 'Coordinator' : 'Driver'}`;
    } else {
      callBtn.style.display = 'none';
    }
  }

  renderChatConversations();
  renderChatMessages(conv);
}

function renderChatMessages(conv) {
  const thread = document.getElementById('chatMessagesThread');
  if (!thread) return;

  thread.innerHTML = conv.messages.map((m, idx) => {
    const isOut = m.sender === 'admin';
    const senderTag = (!isOut && (conv.type === 'group' || m.senderName))
      ? `<span class="chat-sender-tag">${m.senderName || conv.name.split(' ')[0]}</span>`
      : '';

    let contentHtml = '';
    if (m.type === 'photo') {
      contentHtml = `
        <div class="chat-bubble-photo-wrap">
          <img src="${m.imgUrl}" alt="Photo" class="chat-bubble-photo-img">
          ${m.caption ? `<div class="chat-bubble-caption">${m.caption}</div>` : ''}
        </div>
      `;
    } else if (m.type === 'poll') {
      const totalVotes = m.options.reduce((sum, opt) => sum + opt.votes, 0);
      contentHtml = `
        <div class="chat-poll-card">
          <div class="chat-poll-title"><i class="ph ph-chart-bar-horizontal"></i> ${m.question}</div>
          <div class="chat-poll-options">
            ${m.options.map((opt, optIdx) => {
              const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
              const isSelected = m.votedIndex === optIdx;
              return `
                <div class="chat-poll-opt ${isSelected ? 'selected' : ''}" onclick="voteChatPoll('${conv.id}', ${idx}, ${optIdx})">
                  <div class="chat-poll-bar" style="width: ${pct}%;"></div>
                  <div class="chat-poll-opt-content">
                    <span class="chat-poll-opt-text">${opt.text}</span>
                    <span class="chat-poll-opt-pct">${pct}% (${opt.votes})</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          <div class="chat-poll-footer">${totalVotes} votes cast • Broadcast Corridor Poll</div>
        </div>
      `;
    } else if (m.type === 'document') {
      contentHtml = `
        <div class="chat-bubble-doc-card">
          <div class="chat-doc-icon"><i class="ph ph-file-text"></i></div>
          <div class="chat-doc-info">
            <span class="chat-doc-name">${m.docName}</span>
            <span class="chat-doc-size">${m.docSize || 'PDF Document'}</span>
          </div>
          <button type="button" class="chat-doc-dl-btn" title="Download Document" onclick="showToast('Downloading ${m.docName}...', 'info')">
            <i class="ph ph-download-simple"></i>
          </button>
        </div>
      `;
    } else if (m.type === 'contact') {
      contentHtml = `
        <div class="chat-bubble-contact-card">
          <div class="chat-contact-avatar"><i class="ph ph-user"></i></div>
          <div class="chat-contact-info">
            <span class="chat-contact-name">${m.contactName}</span>
            <span class="chat-contact-role">${m.contactRole || 'University Contact'}</span>
            <span class="chat-contact-phone">${m.phone}</span>
          </div>
          <button type="button" class="chat-contact-call-btn" onclick="triggerCall('${m.phone}')" title="Call">
            <i class="ph ph-phone"></i>
          </button>
        </div>
      `;
    } else {
      contentHtml = `<div>${m.text}</div>`;
    }

    return `
      <div class="chat-bubble-flat ${isOut ? 'outgoing' : 'incoming'}">
        ${senderTag}
        ${contentHtml}
        <div class="chat-bubble-time">${m.time}</div>
      </div>
    `;
  }).join('');

  thread.scrollTop = thread.scrollHeight;
}

function voteChatPoll(convId, msgIdx, optIdx) {
  const conv = CHAT_DATA.find(c => c.id === convId);
  if (!conv || !conv.messages[msgIdx]) return;
  const poll = conv.messages[msgIdx];
  if (poll.votedIndex === optIdx) return;

  if (poll.votedIndex !== undefined && poll.votedIndex >= 0) {
    poll.options[poll.votedIndex].votes = Math.max(0, poll.options[poll.votedIndex].votes - 1);
  }
  poll.votedIndex = optIdx;
  poll.options[optIdx].votes++;
  renderChatMessages(conv);
  showToast('Vote recorded: ' + poll.options[optIdx].text, 'info');
}

// =============================================================================
// CHAT TEAM LEVEL ACTIONS & ATTACHMENTS (MATCHING USER REFERENCE DESIGN)
// =============================================================================

function toggleChatActionsMenu(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('chatActionsDropdown');
  const attachDropdown = document.getElementById('chatAttachDropdown');
  if (attachDropdown) attachDropdown.classList.add('hidden');
  if (dropdown) dropdown.classList.toggle('hidden');
}

function toggleChatAttachMenu(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('chatAttachDropdown');
  const actionsDropdown = document.getElementById('chatActionsDropdown');
  if (actionsDropdown) actionsDropdown.classList.add('hidden');
  if (dropdown) dropdown.classList.toggle('hidden');
}

function closeAllChatDropdowns() {
  const actionsDropdown = document.getElementById('chatActionsDropdown');
  const attachDropdown = document.getElementById('chatAttachDropdown');
  if (actionsDropdown) actionsDropdown.classList.add('hidden');
  if (attachDropdown) attachDropdown.classList.add('hidden');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.chat-popover-wrap')) {
    closeAllChatDropdowns();
  }
});

function handleChatAction(action) {
  closeAllChatDropdowns();
  if (action === 'new_group') {
    const groupName = prompt('Enter new dispatch group title:', 'Evening Return Shift Corridor D');
    if (groupName && groupName.trim()) {
      const newGrp = {
        id: 'grp-' + Date.now(),
        name: groupName.trim(),
        type: 'group',
        category: 'driver',
        membersCount: 8,
        time: 'Just now',
        lastMsg: 'Group created by CTD Dispatch Admin',
        unread: false,
        important: false,
        messages: [
          { sender: 'admin', text: `Welcome to ${groupName.trim()}. All corridor drivers please report readiness.`, time: 'Just now' }
        ]
      };
      CHAT_DATA.unshift(newGrp);
      selectChat(newGrp.id);
      showToast(`Created new group: ${newGrp.name}`, 'info');
    }
  } else if (action === 'important') {
    showToast('Showing starred & important messages', 'info');
    AppState.chatFilter = 'all';
    renderChatConversations();
  } else if (action === 'select_chats') {
    showToast('Multi-select mode activated for bulk archiving', 'info');
  }
}

function handleAttachAction(action) {
  closeAllChatDropdowns();
  const conv = CHAT_DATA.find(c => c.name === AppState.activeChatRecipient) || CHAT_DATA[0];
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (action === 'photos') {
    const input = document.getElementById('chatPhotoUpload');
    if (input) input.click();
  } else if (action === 'camera') {
    conv.messages.push({
      sender: 'admin',
      type: 'photo',
      imgUrl: 'buses.png',
      caption: '📷 Live Dispatch Snapshot • Fleet Inspection Complete',
      time: time
    });
    conv.lastMsg = 'You: 📷 Sent a photo';
    conv.time = time;
    renderChatMessages(conv);
    renderChatConversations();
    showToast('Camera snapshot uploaded to thread', 'info');
  } else if (action === 'contact') {
    conv.messages.push({
      sender: 'admin',
      type: 'contact',
      contactName: conv.category === 'coordinator' ? conv.name : 'Santosh Jadhav (Driver)',
      contactRole: conv.category === 'coordinator' ? 'Faculty Coordinator' : 'Nigdi Corridor • Bus U-01',
      phone: conv.phone || '+91 83368 18273',
      time: time
    });
    conv.lastMsg = 'You: 👤 Shared contact card';
    conv.time = time;
    renderChatMessages(conv);
    renderChatConversations();
    showToast('Contact card shared in conversation', 'info');
  } else if (action === 'poll') {
    conv.messages.push({
      sender: 'admin',
      type: 'poll',
      question: 'Corridor Traffic & Roadway Condition Check',
      options: [
        { text: 'Route clear & on scheduled time', votes: 7 },
        { text: 'Moderate congestion near highway bypass', votes: 3 },
        { text: 'Heavy delay - Request detour authorization', votes: 1 }
      ],
      votedIndex: -1,
      time: time
    });
    conv.lastMsg = 'You: 📊 Created a corridor status poll';
    conv.time = time;
    renderChatMessages(conv);
    renderChatConversations();
    showToast('Poll created in conversation', 'info');
  } else if (action === 'document') {
    const docInput = document.getElementById('chatDocUpload');
    if (docInput) docInput.click();
  } else if (action === 'quick_replies') {
    const qrRow = document.querySelector('.chat-quick-replies-row');
    if (qrRow) {
      qrRow.scrollIntoView({ behavior: 'smooth' });
      qrRow.style.background = 'var(--accent-subtle)';
      setTimeout(() => { qrRow.style.background = 'var(--surface)'; }, 1000);
    }
    showToast('Quick replies ready below - click to dispatch instantly', 'info');
  }
}

function handlePhotoUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const conv = CHAT_DATA.find(c => c.name === AppState.activeChatRecipient) || CHAT_DATA[0];
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const reader = new FileReader();
  reader.onload = function(evt) {
    conv.messages.push({
      sender: 'admin',
      type: 'photo',
      imgUrl: evt.target.result,
      caption: `📷 Photo Upload • ${file.name}`,
      time: time
    });
    conv.lastMsg = `You: 📷 Sent ${file.name}`;
    conv.time = time;
    renderChatMessages(conv);
    renderChatConversations();
    showToast('Photo uploaded successfully', 'info');
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function handleDocUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const conv = CHAT_DATA.find(c => c.name === AppState.activeChatRecipient) || CHAT_DATA[0];
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sizeFormatted = file.size > 1024 * 1024 ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' : (file.size / 1024).toFixed(0) + ' KB';

  conv.messages.push({
    sender: 'admin',
    type: 'document',
    docName: file.name,
    docSize: `${sizeFormatted} • Document`,
    time: time
  });
  conv.lastMsg = `You: 📄 Sent ${file.name}`;
  conv.time = time;
  renderChatMessages(conv);
  renderChatConversations();
  showToast('Document sent in conversation', 'info');
  e.target.value = '';
}

function quickReplyChat(text) {
  document.getElementById('chatMessageInput').value = text;
  sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById('chatMessageInput');
  const val = input.value.trim();
  if (!val) return;

  const conv = CHAT_DATA.find(c => c.name === AppState.activeChatRecipient) || CHAT_DATA[0];
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  conv.messages.push({ sender: 'admin', text: val, time: time });
  conv.lastMsg = `You: ${val}`;
  conv.time = time;
  input.value = '';

  renderChatMessages(conv);
  renderChatConversations();

  setTimeout(() => {
    const senderName = conv.type === 'group' ? 'Santosh (Bus U-01)' : conv.name.split(' ')[0];
    const replyText = conv.category === 'coordinator' 
      ? 'Received update CTD Admin. Coordinating with department students.' 
      : 'Acknowledged control room. Proceeding with caution.';

    conv.messages.push({ 
      sender: conv.category === 'coordinator' ? 'coordinator' : 'driver', 
      senderName: senderName,
      text: replyText, 
      time: 'Just now' 
    });
    conv.lastMsg = `${senderName}: ${replyText}`;
    conv.time = 'Just now';
    renderChatMessages(conv);
    renderChatConversations();
  }, 1100);
}

function handleChatInputKeyDown(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function filterChatConversations() {
  renderChatConversations();
}

// =============================================================================
// COMPLAINTS & GRIEVANCES DESK (INCIDENTS & GRIEVANCE LOGS)
// =============================================================================

const COMPLAINTS_DATA = [
  { id: 'CMP-01', name: 'Student', role: 'Student', category: 'Delay', issue: 'Bus arrived 25 mins late at Nigdi stop due to unannounced corridor detour.', route: 'Bus A - Nigdi', status: 'pending', date: '28 Jan, 2026', time: '8:45 AM' },
  { id: 'CMP-02', name: 'Student', role: 'Student', category: 'Comfort', issue: 'Need curtains in Bus E; harsh morning sunlight on left window seats.', route: 'Bus E - Lohegaon', status: 'pending', date: '28 Jan, 2026', time: '9:15 AM' },
  { id: 'CMP-03', name: 'Coordinator', role: 'Coordinator', category: 'Safety', issue: 'Rash driving and harsh braking reported near Phoenix Mall bypass.', route: 'Bus E - Lohegaon', status: 'in-progress', date: '27 Jan, 2026', time: '8:10 AM' },
  { id: 'CMP-04', name: 'Faculty', role: 'Faculty', category: 'Delay', issue: 'Bus departure delayed by 20 mins from origin terminus.', route: 'Bus E - Lohegaon', status: 'in-progress', date: '26 Jan, 2026', time: '7:20 AM' },
  { id: 'CMP-05', name: 'Student', role: 'Student', category: 'Overcrowding', issue: 'Excess passengers standing in aisle between Baner and University Gate.', route: 'Bus B - Chaphekar', status: 'pending', date: '26 Jan, 2026', time: '8:05 AM' },
  { id: 'CMP-06', name: 'Student', role: 'Student', category: 'AC & Cooling', issue: 'AC cooling defective in rear cabin seats 36-45.', route: 'Bus D - Moshi', status: 'in-progress', date: '25 Jan, 2026', time: '8:30 AM' },
  { id: 'CMP-07', name: 'Student', role: 'Student', category: 'Route Deviation', issue: 'Driver skipped scheduled pickup stop at Chandani Chowk without prior alert.', route: 'Bus F - Pashan', status: 'resolved', date: '24 Jan, 2026', time: '7:15 AM' },
  { id: 'CMP-08', name: 'Faculty', role: 'Faculty', category: 'Cleanliness', issue: 'Seat covers on row 4 soiled and floor needs vacuuming before morning run.', route: 'Bus U-01', status: 'resolved', date: '23 Jan, 2026', time: '6:50 AM' },
  { id: 'CMP-09', name: 'Student', role: 'Student', category: 'Safety', issue: 'Emergency door latch loose on right side rear.', route: 'Bus U-04', status: 'resolved', date: '22 Jan, 2026', time: '5:40 PM' },
  { id: 'CMP-10', name: 'Student', role: 'Student', category: 'Delay', issue: 'Morning pickup delayed due to HPCL fuel pump queue.', route: 'Bus B - Chaphekar', status: 'resolved', date: '21 Jan, 2026', time: '7:10 AM' },
  { id: 'CMP-11', name: 'Student', role: 'Student', category: 'Behavior', issue: 'Attendant spoke rudely to boarding first-year student and delayed entry.', route: 'Bus D - Moshi', status: 'pending', date: '20 Jan, 2026', time: '7:35 AM' },
  { id: 'CMP-12', name: 'Student', role: 'Student', category: 'AC & Cooling', issue: 'Water dripping from AC vent onto seat 12.', route: 'Bus U-03', status: 'in-progress', date: '19 Jan, 2026', time: '9:00 AM' }
];

function renderComplaints() {
  const tbody = document.getElementById('complaintsTableBody');
  if (!tbody) return;

  const q = (document.getElementById('complaintsSearchInput')?.value || '').toLowerCase().trim();
  const cat = document.getElementById('complaintCategoryFilter')?.value || 'all';
  const rte = document.getElementById('complaintRouteFilter')?.value || 'all';
  const statusFilter = AppState.complaintFilter || 'all';

  const filtered = COMPLAINTS_DATA.filter(c => {
    // Status match
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;

    // Category match
    const matchCat = cat === 'all' || c.category === cat;

    // Route match
    const matchRoute = rte === 'all' || c.route.toLowerCase().includes(rte.toLowerCase());

    // Search query match (searches issue, category, route, date, and role)
    const matchQ = !q || 
      c.issue.toLowerCase().includes(q) || 
      c.category.toLowerCase().includes(q) || 
      c.route.toLowerCase().includes(q) ||
      c.date.toLowerCase().includes(q) ||
      (c.role && c.role.toLowerCase().includes(q)) ||
      (c.name && c.name.toLowerCase().includes(q));

    return matchStatus && matchCat && matchRoute && matchQ;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px;">
          <i class="ph ph-check-circle" style="font-size: 28px; color: var(--success); display: block; margin-bottom: 6px;"></i>
          No complaints match the specified filters.
        </td>
      </tr>
    `;
    updateComplaintsKPIs();
    return;
  }

  tbody.innerHTML = filtered.map(c => {
    const statusClass = c.status === 'resolved' ? 'active' :
                        c.status === 'in-progress' ? 'warning' : 'danger';
    const statusLabel = c.status === 'resolved' ? 'Resolved' :
                        c.status === 'in-progress' ? 'In Progress' : 'Pending';

    let actionBtn = '';
    if (c.status === 'pending') {
      actionBtn = `<button class="btn-clean btn-clean-sm" onclick="advanceComplaintStatus('${c.id}')"><i class="ph ph-arrow-right"></i> Start work</button>`;
    } else if (c.status === 'in-progress') {
      actionBtn = `<button class="btn-clean btn-clean-primary btn-clean-sm" onclick="resolveComplaintPrompt('${c.id}')"><i class="ph ph-check"></i> Resolve</button>`;
    } else {
      actionBtn = `<button class="btn-clean btn-clean-sm" onclick="reopenComplaint('${c.id}')"><i class="ph ph-arrow-counter-clockwise"></i> Reopen</button>`;
    }

    const reporterRole = c.role || c.name || 'Student';

    return `
      <tr>
        <td style="width: 230px;">
          <div class="anonymous-reporter-box">
            <span class="anonymous-reporter-title">
              ${reporterRole}
            </span>
            <span class="anonymous-reporter-sub">${c.date} • Verified passholder</span>
          </div>
        </td>
        <td style="width: 140px;"><span class="badge-clean">${c.category}</span></td>
        <td><div style="font-size: 13.5px; font-weight: 500; color: var(--text-primary); line-height: 1.45;">${c.issue}</div></td>
        <td style="width: 180px;"><code>${c.route}</code></td>
        <td style="width: 140px;"><span class="badge-clean ${statusClass}">${statusLabel}</span></td>
        <td style="width: 130px; text-align: right;">${actionBtn}</td>
      </tr>
    `;
  }).join('');

  updateComplaintsKPIs();
}

function filterComplaintsByStatus(status, btn) {
  AppState.complaintFilter = status;
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderComplaints();
}

function filterComplaints() {
  renderComplaints();
}

function updateComplaintsKPIs() {
  const total = COMPLAINTS_DATA.length;
  const pending = COMPLAINTS_DATA.filter(c => c.status === 'pending').length;
  const inProgress = COMPLAINTS_DATA.filter(c => c.status === 'in-progress').length;
  const resolved = COMPLAINTS_DATA.filter(c => c.status === 'resolved').length;

  const totalEl = document.getElementById('kpiTotalComplaints');
  const pendingEl = document.getElementById('kpiPendingComplaints');
  const inProgEl = document.getElementById('kpiInProgressComplaints');
  const resEl = document.getElementById('kpiResolvedComplaints');

  if (totalEl) totalEl.textContent = total;
  if (pendingEl) pendingEl.textContent = pending;
  if (inProgEl) inProgEl.textContent = inProgress;
  if (resEl) resEl.textContent = resolved;

  // Pills display clean status names without duplicated counters
}

function advanceComplaintStatus(id) {
  const comp = COMPLAINTS_DATA.find(c => c.id === id);
  if (!comp) return;

  comp.status = 'in-progress';
  playProminentSound('success');
  renderComplaints();
  triggerToast(`Grievance ${id} escalated to In Progress`, 'info');
}

function reopenComplaint(id) {
  const comp = COMPLAINTS_DATA.find(c => c.id === id);
  if (!comp) return;

  comp.status = 'pending';
  playProminentSound('success');
  renderComplaints();
  triggerToast(`Grievance ${id} reopened as Pending`, 'info');
}

function resolveComplaintPrompt(id) {
  const comp = COMPLAINTS_DATA.find(c => c.id === id);
  if (!comp) return;

  const notes = prompt(`Resolve Grievance for ${comp.name}:\nEnter resolution comment:`, 'Driver instructed on schedule timings. Resolved.');
  if (notes) {
    comp.status = 'resolved';
    playProminentSound('success'); // Prominent action sound
    renderComplaints();
    triggerToast(`Grievance ${id} marked as Resolved!`, 'success');
  }
}

function openNewComplaintModal() {
  const cat = prompt('Enter Complaint Category (Delay / Safety / Comfort / AC & Cooling / Overcrowding):', 'Comfort') || 'General';
  const issue = prompt('Enter Grievance Description:', 'Air conditioning blower speed weak in rear cabin.');
  const reporterRole = prompt('Enter Reporter Role (Student / Faculty / Coordinator):', 'Student') || 'Student';
  if (issue) {
    COMPLAINTS_DATA.unshift({
      id: `CMP-0${COMPLAINTS_DATA.length + 1}`,
      name: reporterRole,
      role: reporterRole,
      category: cat,
      issue: issue,
      route: 'Bus E - Lohegaon',
      status: 'pending',
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    playProminentSound('success'); // Prominent action sound
    renderComplaints();
    triggerToast(`Grievance registered successfully`, 'success');
  }
}

// =============================================================================
// DEDICATED DRIVERS REGISTRY VIEW CONTROLLER
// =============================================================================

function renderDedicatedDrivers() {
  const container = document.getElementById('dedicatedDriversContainer');
  if (!container) return;

  const q = (document.getElementById('dedicatedDriverSearchInput')?.value || '').toLowerCase().trim();

  const filtered = UNIVERSITY_DRIVERS_DATA.filter(d => {
    return !q ||
      d.name.toLowerCase().includes(q) ||
      d.empId.toLowerCase().includes(q) ||
      d.phone.includes(q) ||
      (d.license && d.license.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 36px; color: var(--text-muted); border: 1px solid var(--border); border-radius: var(--radius-card); background: var(--surface);">
        <i class="ph ph-user-circle" style="font-size: 28px; color: var(--text-muted); margin-bottom: 8px; display: block;"></i>
        <div>No campus fleet drivers match your search query.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(d => {
    return `
      <div class="univ-driver-card">
        <div>
          <!-- Top Header: Driver Avatar, Name, Employee ID & Phone -->
          <div class="univ-driver-header">
            <img src="${d.photo}" alt="${d.name}" class="univ-driver-avatar">
            <div class="univ-driver-info">
              <div class="univ-driver-title">${d.name}</div>
              <div class="univ-driver-empid">Emp ID: ${d.empId}</div>
              <a href="tel:${d.phone}" class="univ-driver-phone-link" onclick="event.stopPropagation(); triggerCall('${d.phone}')">
                <i class="ph ph-phone"></i> ${d.phone}
              </a>
            </div>
          </div>

          <!-- 3-Column Clean Metrics Strip: Experience, Attendance, Rating (No Assigned Bus, No Duty Roster) -->
          <div class="univ-driver-stats-strip" style="margin-top: 14px;">
            <div class="univ-driver-stat-col">
              <span class="univ-driver-stat-label">Experience</span>
              <span class="univ-driver-stat-val">${d.exp}</span>
            </div>
            <div class="univ-driver-stat-col">
              <span class="univ-driver-stat-label">Attendance</span>
              <span class="univ-driver-stat-val">${d.attendance.split(' ')[0]}</span>
              <span class="univ-driver-stat-sub">${d.attendance.includes('(') ? d.attendance.split('(')[1].replace(')', '') : 'Monthly'}</span>
            </div>
            <div class="univ-driver-stat-col">
              <span class="univ-driver-stat-label">Rating</span>
              <span class="univ-driver-stat-val accent">${d.rating.split(' ')[0]}</span>
              <span class="univ-driver-stat-sub">/ 5.0 Safety</span>
            </div>
          </div>
        </div>

        <!-- Footer with Call & Chat Action Buttons (Labeled 'Chat') -->
        <div class="univ-driver-footer">
          <a href="tel:${d.phone}" class="btn-driver-call" onclick="event.stopPropagation(); triggerCall('${d.phone}')">
            <i class="ph ph-phone-call"></i> Call
          </a>
          <button class="btn-driver-chat" onclick="navigateTo('chat'); selectChatByName('${d.name}')">
            <i class="ph ph-chat-circle"></i> Chat
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setDedicatedDriverFilter(status, btn) {
  AppState.dedicatedDriverFilter = status;
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderDedicatedDrivers();
}

function filterDedicatedDrivers() {
  renderDedicatedDrivers();
}

// =============================================================================
// PASSENGERS VIEW (STATS, MULTI-DIMENSIONAL FILTERS & RFID SMART PASSES)
// =============================================================================

function updatePassengersKPIs() {
  const total = PASSENGERS_DATA.length;
  const paid = PASSENGERS_DATA.filter(p => p.feeStatus === 'Paid').length;
  const pending = PASSENGERS_DATA.filter(p => p.feeStatus === 'Pending').length;
  const overdue = PASSENGERS_DATA.filter(p => p.feeStatus === 'Overdue').length;
  const collected = PASSENGERS_DATA.filter(p => p.passStatus === 'Collected').length;
  const notCollected = PASSENGERS_DATA.filter(p => p.passStatus === 'Not collected').length;

  const totalEl = document.getElementById('kpiTotalPassengers');
  const paidEl = document.getElementById('kpiPaidPassengers');
  const pendingEl = document.getElementById('kpiPendingPassengers');
  const collectedEl = document.getElementById('kpiPassesCollected');
  const notCollectedEl = document.getElementById('kpiPassesNotCollected');

  if (totalEl) totalEl.textContent = '4,280';
  if (collectedEl) collectedEl.textContent = `${3720 + collected}`;
  if (notCollectedEl) notCollectedEl.textContent = `${550 + notCollected}`;
  if (paidEl) paidEl.textContent = `${3880 + paid}`;
  if (pendingEl) pendingEl.textContent = `${260 + pending}`;

  // Live Counts on pills
  const countAll = document.getElementById('passCountAll');
  const countPaid = document.getElementById('passCountPaid');
  const countPending = document.getElementById('passCountPending');
  const countOverdue = document.getElementById('passCountOverdue');

  if (countAll) countAll.textContent = total;
  if (countPaid) countPaid.textContent = paid;
  if (countPending) countPending.textContent = pending;
  if (countOverdue) countOverdue.textContent = overdue;
}

function setPassengerStatusFilter(status, btn) {
  AppState.passengerStatusFilter = status;
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderPassengers();
}

function setPassengerViewMode(mode) {
  AppState.passengerViewMode = mode;
  const tableContainer = document.getElementById('passengersTableContainer');
  const cardsContainer = document.getElementById('passengersCardsContainer');
  const btnTable = document.getElementById('btnPassengerViewTable');
  const btnCards = document.getElementById('btnPassengerViewCards');

  if (mode === 'cards') {
    if (tableContainer) tableContainer.style.display = 'none';
    if (cardsContainer) cardsContainer.style.display = 'grid';
    if (btnCards) {
      btnCards.classList.add('active');
      btnCards.style.background = 'var(--bg-hover)';
    }
    if (btnTable) {
      btnTable.classList.remove('active');
      btnTable.style.background = '';
    }
  } else {
    if (tableContainer) tableContainer.style.display = 'block';
    if (cardsContainer) cardsContainer.style.display = 'none';
    if (btnTable) {
      btnTable.classList.add('active');
      btnTable.style.background = 'var(--bg-hover)';
    }
    if (btnCards) {
      btnCards.classList.remove('active');
      btnCards.style.background = '';
    }
  }
  renderPassengers();
}

function filterPassengers() {
  renderPassengers();
}

function getFilteredPassengers() {
  const q = (document.getElementById('passengerSearchInput')?.value || '').toLowerCase().trim();
  const passStatusFilter = document.getElementById('passengerPassStatusFilter')?.value || 'all';
  const fee = document.getElementById('passengerFeeStatusFilter')?.value || 'all';
  const route = document.getElementById('passengerRouteFilter')?.value || 'all';
  const statusTab = AppState.passengerStatusFilter || 'all';

  return PASSENGERS_DATA.filter(p => {
    // 1. Search query
    const matchSearch = !q || 
      p.id.toLowerCase().includes(q) || 
      p.name.toLowerCase().includes(q) || 
      (p.passNo && p.passNo.toLowerCase().includes(q)) ||
      (p.boardingStop && p.boardingStop.toLowerCase().includes(q)) ||
      (p.route && p.route.toLowerCase().includes(q));

    // 2. Status tab pill (fee status)
    const matchStatusTab = (statusTab === 'all') || 
      (p.feeStatus.toLowerCase() === statusTab.toLowerCase());

    // 3. Pass Status Filter
    const matchPassStatus = (passStatusFilter === 'all') || 
      (p.passStatus && p.passStatus.toLowerCase() === passStatusFilter.toLowerCase());

    // 4. Fee Status Dropdown Filter
    const matchFee = (fee === 'all') || 
      (p.feeStatus.toLowerCase() === fee.toLowerCase());

    // 5. Route Corridor Filter
    const matchRoute = (route === 'all') || 
      (p.route && p.route.toLowerCase().includes(route.toLowerCase()));

    return matchSearch && matchStatusTab && matchPassStatus && matchFee && matchRoute;
  });
}

function renderPassengers() {
  const filtered = getFilteredPassengers();
  const tbody = document.getElementById('passengersTableBody');
  const cardsContainer = document.getElementById('passengersCardsContainer');

  updatePassengersKPIs();

  // Render Table View (No pills beside name, no (PD) avatar box, no discipline & year, no attendance, with Pass Status & 3-dots)
  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 36px 20px; color: var(--text-muted);">
            <i class="ph ph-user-circle" style="font-size: 32px; display: block; margin-bottom: 8px; color: #9CA3AF;"></i>
            <strong>No matching transport users found</strong>
            <p style="font-size: 12px; margin-top: 4px;">Try adjusting your search keywords, pass status, fee status, or corridor filters.</p>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = filtered.map(p => {
        const feeBadgeClass = p.feeStatus === 'Paid' ? 'paid' : (p.feeStatus === 'Pending' ? 'pending' : 'overdue');
        const passBadgeClass = p.passStatus === 'Collected' ? 'operational' : 'warning';

        return `
          <tr>
            <td>
              <code>${p.id}</code>
            </td>
            <td>
              <div class="passenger-name-cell">
                <span class="passenger-main-name" style="font-weight: 600; color: var(--text-primary);">${p.name}</span>
              </div>
            </td>
            <td>
              <div style="display: flex; flex-direction: column;">
                <span style="font-size: 13px; font-weight: 500;">${p.route}</span>
                <span style="font-size: 11px; color: var(--text-muted); font-variant-numeric: tabular-nums;">${p.busId}</span>
              </div>
            </td>
            <td>
              <span style="font-size: 13px; color: var(--text-primary); display: inline-flex; align-items: center; gap: 4px;">
                <i class="ph ph-map-pin"></i> ${p.boardingStop}
              </span>
            </td>
            <td>
              <span class="pill-pass-status ${p.passStatus === 'Collected' ? 'collected' : 'not-collected'}">
                ${p.passStatus === 'Collected' ? 'Pass Collected' : 'Not Collected'}
              </span>
            </td>
            <td>
              <button class="badge-clean ${feeBadgeClass}" style="cursor: pointer; border: none; background: transparent;" onclick="togglePassengerFeeStatus('${p.id}')" title="Click to cycle fee status">
                ${p.feeStatus}
              </button>
            </td>
            <td style="text-align: right; position: relative;">
              <button type="button" class="btn-action-dots" onclick="openPassengerActions('${p.id}', event)" title="Management options">
                <i class="ph ph-dots-three-vertical"></i>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // Render Cards Grid View
  if (cardsContainer) {
    if (filtered.length === 0) {
      cardsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted); background: #FFF; border: 1px solid var(--border-color); border-radius: 8px;">
          <i class="ph ph-magnifying-glass" style="font-size: 32px; display: block; margin-bottom: 8px; color: #9CA3AF;"></i>
          <strong>No matching smart pass records</strong>
          <p style="font-size: 12px; margin-top: 4px;">Adjust current filter criteria to display transit passes.</p>
        </div>
      `;
    } else {
      cardsContainer.innerHTML = filtered.map(p => {
        const feeBadgeClass = p.feeStatus === 'Paid' ? 'paid' : (p.feeStatus === 'Pending' ? 'pending' : 'overdue');
        const passBadgeClass = p.passStatus === 'Collected' ? 'operational' : 'warning';

        return `
          <div class="smart-pass-card">
            <div class="smart-pass-top-bar">
              <span>MIT ADT Transit Pass</span>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="smart-pass-rfid-chip">
                  <i class="ph ph-broadcast"></i> RFID
                </span>
                <button type="button" class="btn-action-dots" style="width: 24px; height: 24px; font-size: 14px;" onclick="openPassengerActions('${p.id}', event)" title="Management Options">
                  <i class="ph ph-dots-three-vertical"></i>
                </button>
              </div>
            </div>
            <div class="smart-pass-body">
              <div class="smart-pass-user-row">
                <div class="smart-pass-user-meta" style="width: 100%;">
                  <div class="smart-pass-name" style="font-size: 15px; font-weight: 600;">${p.name}</div>
                  <div class="smart-pass-prn" style="font-family: monospace; font-size: 12px; color: var(--text-muted); margin-top: 2px;"><code>${p.id}</code> • ${p.passNo || 'SP-2026'}</div>
                </div>
              </div>

              <div class="smart-pass-details-list">
                <div class="smart-pass-detail-row">
                  <span class="smart-pass-detail-label">Pass Status</span>
                  <span class="pill-pass-status ${p.passStatus === 'Collected' ? 'collected' : 'not-collected'}">
                    ${p.passStatus === 'Collected' ? 'Pass Collected' : 'Not Collected'}
                  </span>
                </div>
                <div class="smart-pass-detail-row">
                  <span class="smart-pass-detail-label">Corridor</span>
                  <span class="smart-pass-detail-val">${p.route}</span>
                </div>
                <div class="smart-pass-detail-row">
                  <span class="smart-pass-detail-label">Stop</span>
                  <span class="smart-pass-detail-val">${p.boardingStop}</span>
                </div>
                <div class="smart-pass-detail-row">
                  <span class="smart-pass-detail-label">Bus</span>
                  <span class="smart-pass-detail-val">${p.busId}</span>
                </div>
                <div class="smart-pass-detail-row">
                  <span class="smart-pass-detail-label">Valid thru</span>
                  <span class="smart-pass-detail-val">${p.validUntil || '30 Jun 2026'}</span>
                </div>
              </div>
            </div>
            <div class="smart-pass-footer">
              <span class="badge-clean ${feeBadgeClass}">${p.feeStatus}</span>
              <div style="display: flex; gap: 6px;">
                <button class="btn-clean btn-clean-sm" onclick="openEditPassengerModal('${p.id}')">
                  <i class="ph ph-pencil-simple"></i> Edit Profile
                </button>
                <button class="btn-clean btn-clean-sm" onclick="openSmartPassModal('${p.id}')">
                  Inspect pass
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

// -----------------------------------------------------------------------------
// 3-DOTS MANAGEMENT ACTION POPOVER & EDIT PROFILE CONTROLLERS
// -----------------------------------------------------------------------------

function openPassengerActions(passengerId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  let p = PASSENGERS_DATA.find(x => x.id === passengerId);
  if (!p) {
    const route = BUS_ROUTES_DETAILED[AppState.currentRouteId] || BUS_ROUTES_DETAILED['bus-e'];
    const rp = route?.passengers?.find(x => x.rollNo === passengerId || x.id === passengerId);
    if (rp) {
      p = {
        id: rp.rollNo,
        name: rp.name,
        passStatus: rp.passStatus || (rp.status === 'Paid' ? 'Collected' : 'Not collected'),
        feeStatus: rp.feeStatus || rp.status || 'Paid',
        phone: rp.phone || '+91 98000 00000',
        boardingStop: rp.boardingStop,
        department: rp.dept || 'Engineering'
      };
    }
  }
  if (!p) return;

  closePassengerActions();

  const popover = document.createElement('div');
  popover.id = 'passengerActionPopover';
  popover.className = 'passenger-action-popover';

  const isCollected = p.passStatus === 'Collected';
  const toggleText = isCollected ? 'Mark as Not collected' : 'Mark as Collected';
  const toggleIcon = isCollected ? 'ph-x-circle' : 'ph-check-circle';

  popover.innerHTML = `
    <div class="action-popover-menu">
      <button type="button" class="action-popover-item" onclick="togglePassengerPassStatus('${p.id}')">
        <i class="ph ${toggleIcon}"></i>
        <span>${toggleText}</span>
      </button>
      <button type="button" class="action-popover-item" onclick="openEditPassengerModal('${p.id}')">
        <i class="ph ph-pencil-simple"></i>
        <span>Edit Profile</span>
      </button>
      <button type="button" class="action-popover-item" onclick="openSmartPassModal('${p.id}')">
        <i class="ph ph-identification-card"></i>
        <span>View Smart Pass</span>
      </button>
      <button type="button" class="action-popover-item danger" onclick="deletePassenger('${p.id}')">
        <i class="ph ph-trash"></i>
        <span>Remove Profile</span>
      </button>
    </div>
  `;

  document.body.appendChild(popover);

  const triggerBtn = (event && (event.currentTarget || event.target.closest('button'))) || null;
  if (triggerBtn) {
    const rect = triggerBtn.getBoundingClientRect();
    const popoverWidth = 200;
    let left = rect.right - popoverWidth;
    if (left < 10) left = 10;
    let top = rect.bottom + 6;
    if (top + 160 > window.innerHeight) {
      top = rect.top - 160;
    }
    popover.style.top = `${top + window.scrollY}px`;
    popover.style.left = `${left + window.scrollX}px`;
  }

  setTimeout(() => {
    document.addEventListener('click', onDocClickClosePopover);
    document.addEventListener('keydown', onDocKeyClosePopover);
  }, 20);
}

function closePassengerActions() {
  const existing = document.getElementById('passengerActionPopover');
  if (existing) {
    existing.remove();
  }
  document.removeEventListener('click', onDocClickClosePopover);
  document.removeEventListener('keydown', onDocKeyClosePopover);
}

function onDocClickClosePopover(e) {
  const popover = document.getElementById('passengerActionPopover');
  if (popover && !popover.contains(e.target)) {
    closePassengerActions();
  }
}

function onDocKeyClosePopover(e) {
  if (e.key === 'Escape') {
    closePassengerActions();
  }
}

function togglePassengerPassStatus(passengerId) {
  closePassengerActions();
  let p = PASSENGERS_DATA.find(x => x.id === passengerId);
  let routeP = null;
  const route = BUS_ROUTES_DETAILED[AppState.currentRouteId] || BUS_ROUTES_DETAILED['bus-e'];
  if (route && route.passengers) {
    routeP = route.passengers.find(x => x.rollNo === passengerId || x.id === passengerId);
  }

  if (p) {
    p.passStatus = (p.passStatus === 'Collected' ? 'Not collected' : 'Collected');
  }
  if (routeP) {
    const cur = routeP.passStatus || (routeP.status === 'Paid' ? 'Collected' : 'Not collected');
    routeP.passStatus = (cur === 'Collected' ? 'Not collected' : 'Collected');
  }

  const name = p?.name || routeP?.name || 'User';
  const status = p?.passStatus || routeP?.passStatus || 'Updated';

  playProminentSound('success');
  renderPassengers();
  updatePassengersKPIs();
  renderSettingsUsersTable();
  filterRoutePassengers();
  triggerToast(`Pass status for ${name} updated to: ${status}`, 'success');
}

function openEditPassengerModal(passengerId) {
  closePassengerActions();
  let p = PASSENGERS_DATA.find(x => x.id === passengerId);

  if (!p) {
    for (const rKey in BUS_ROUTES_DETAILED) {
      const r = BUS_ROUTES_DETAILED[rKey];
      if (r && r.passengers) {
        const found = r.passengers.find(x => x.rollNo === passengerId || x.id === passengerId);
        if (found) {
          p = {
            id: found.rollNo || found.id,
            name: found.name,
            passStatus: found.passStatus || (found.status === 'Paid' ? 'Collected' : 'Not collected'),
            feeStatus: found.feeStatus || found.status || 'Paid',
            route: r.name,
            busId: r.bus,
            boardingStop: found.boardingStop,
            phone: found.phone || '+91 98000 12345',
            department: found.dept || 'School of Engineering',
            passNo: 'SP-2026'
          };
          break;
        }
      }
    }
  }

  if (!p) return;

  const origIdInput = document.getElementById('editPassengerOrigId');
  const idInput = document.getElementById('editPassengerId');
  const passNoInput = document.getElementById('editPassengerPassNo');
  const nameInput = document.getElementById('editPassengerName');
  const passStatusSelect = document.getElementById('editPassengerPassStatus');
  const feeStatusSelect = document.getElementById('editPassengerFeeStatus');
  const routeSelect = document.getElementById('editPassengerRoute');
  const busInput = document.getElementById('editPassengerBus');
  const stopInput = document.getElementById('editPassengerStop');
  const phoneInput = document.getElementById('editPassengerPhone');

  if (origIdInput) origIdInput.value = p.id;
  if (idInput) idInput.value = p.id;
  if (passNoInput) passNoInput.value = p.passNo || 'SP-2026';
  if (nameInput) nameInput.value = p.name || '';
  if (passStatusSelect) passStatusSelect.value = p.passStatus || 'Collected';
  if (feeStatusSelect) feeStatusSelect.value = p.feeStatus || 'Paid';
  if (routeSelect) routeSelect.value = p.route || 'Bus E - Lohegaon';
  if (busInput) busInput.value = p.busId || 'MH12-AB-1234';
  if (stopInput) stopInput.value = p.boardingStop || '';
  if (phoneInput) phoneInput.value = p.phone || '';

  const modal = document.getElementById('editPassengerModal');
  if (modal) modal.classList.remove('hidden');
}

function closeEditPassengerModal() {
  const modal = document.getElementById('editPassengerModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveEditedPassenger(e) {
  e.preventDefault();
  const origId = document.getElementById('editPassengerOrigId')?.value;
  if (!origId) return;

  const newName = document.getElementById('editPassengerName')?.value.trim();
  const newPassStatus = document.getElementById('editPassengerPassStatus')?.value;
  const newFeeStatus = document.getElementById('editPassengerFeeStatus')?.value;
  const newRoute = document.getElementById('editPassengerRoute')?.value;
  const newBus = document.getElementById('editPassengerBus')?.value.trim();
  const newStop = document.getElementById('editPassengerStop')?.value.trim();
  const newPhone = document.getElementById('editPassengerPhone')?.value.trim();

  let p = PASSENGERS_DATA.find(x => x.id === origId);
  if (p) {
    if (newName) p.name = newName;
    if (newPassStatus) p.passStatus = newPassStatus;
    if (newFeeStatus) p.feeStatus = newFeeStatus;
    if (newRoute) p.route = newRoute;
    if (newBus) p.busId = newBus;
    if (newStop) p.boardingStop = newStop;
    if (newPhone) p.phone = newPhone;
  }

  // Also update across all routes in BUS_ROUTES_DETAILED
  for (const rKey in BUS_ROUTES_DETAILED) {
    const r = BUS_ROUTES_DETAILED[rKey];
    if (r && r.passengers) {
      const rp = r.passengers.find(x => x.rollNo === origId || x.id === origId);
      if (rp) {
        if (newName) rp.name = newName;
        if (newPhone) rp.phone = newPhone;
        if (newStop) rp.boardingStop = newStop;
        if (newPassStatus) rp.passStatus = newPassStatus;
        if (newFeeStatus) {
          rp.feeStatus = newFeeStatus;
          rp.status = newFeeStatus;
        }
      }
    }
  }

  const finalName = newName || p?.name || origId;

  playProminentSound('success');
  closeEditPassengerModal();
  renderPassengers();
  updatePassengersKPIs();
  renderSettingsUsersTable();
  filterRoutePassengers();

  triggerToast(`Profile for ${finalName} updated successfully!`, 'success');
}

function deletePassenger(passengerId) {
  closePassengerActions();
  let name = passengerId;
  const idx = PASSENGERS_DATA.findIndex(x => x.id === passengerId);
  if (idx !== -1) {
    name = PASSENGERS_DATA[idx].name;
    PASSENGERS_DATA.splice(idx, 1);
  }

  for (const rKey in BUS_ROUTES_DETAILED) {
    const r = BUS_ROUTES_DETAILED[rKey];
    if (r && r.passengers) {
      const rIdx = r.passengers.findIndex(x => x.rollNo === passengerId || x.id === passengerId);
      if (rIdx !== -1) {
        name = r.passengers[rIdx].name;
        r.passengers.splice(rIdx, 1);
      }
    }
  }

  playProminentSound('click');
  renderPassengers();
  updatePassengersKPIs();
  renderSettingsUsersTable();
  filterRoutePassengers();
  triggerToast(`Transport user ${name} removed from roster`, 'warning');
}

function openSmartPassModal(passengerId) {
  let p = PASSENGERS_DATA.find(x => x.id === passengerId);
  if (!p) {
    for (const rKey in BUS_ROUTES_DETAILED) {
      const r = BUS_ROUTES_DETAILED[rKey];
      if (r && r.passengers) {
        const found = r.passengers.find(x => x.rollNo === passengerId || x.id === passengerId);
        if (found) {
          p = {
            id: found.rollNo || found.id,
            name: found.name,
            passStatus: found.passStatus || (found.status === 'Paid' ? 'Collected' : 'Not collected'),
            feeStatus: found.feeStatus || found.status || 'Paid',
            route: r.name,
            busId: r.bus,
            boardingStop: found.boardingStop,
            phone: found.phone || '+91 98000 12345',
            department: found.dept || 'School of Engineering',
            passNo: 'SP-2026-9041',
            validUntil: '30 Jun 2026'
          };
          break;
        }
      }
    }
  }
  if (!p) p = PASSENGERS_DATA[0];
  if (!p) return;

  const modal = document.getElementById('smartPassModal');
  const content = document.getElementById('smartPassModalContent');
  if (!modal || !content) return;

  const statusClass = p.feeStatus === 'Paid' ? 'operational' : (p.feeStatus === 'Pending' ? 'warning' : 'danger');
  const statusLabel = p.feeStatus === 'Paid' ? 'Fees cleared and authorized' : (p.feeStatus === 'Pending' ? 'Verification pending' : 'Payment overdue');
  const statusBadge = `<span class="badge-clean ${statusClass}">${statusLabel}</span>`;
  const passBadgeClass = p.passStatus === 'Collected' ? 'operational' : 'warning';

  content.innerHTML = `
    <div class="physical-card-preview">
      <div class="physical-card-header">
        <div>
          <div class="card-univ-title">MIT ADT University • Pune</div>
          <div class="card-univ-sub">Campus transit division • RFID smart pass</div>
        </div>
        <div style="font-size: 11px; font-family: monospace; color: var(--text-muted);">
          ${p.passNo || 'SP-2026-9041'}
        </div>
      </div>

      <div class="physical-card-main" style="display: flex; gap: 14px; align-items: center; margin-bottom: 16px;">
        <div class="card-user-info-large">
          <div style="font-size: 16px; font-weight: 600; color: var(--text-primary);">${p.name}</div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;"><code>${p.id}</code> • Transport Pass</div>
        </div>
      </div>

      <div class="physical-card-grid">
        <div class="card-spec-item" style="display: flex; flex-direction: column;">
          <span style="font-size: 12px; color: var(--text-muted);">Pass Status</span>
          <span class="badge-clean ${passBadgeClass}" style="margin-top: 3px;">${p.passStatus}</span>
        </div>
        <div class="card-spec-item" style="display: flex; flex-direction: column;">
          <span style="font-size: 12px; color: var(--text-muted);">Assigned corridor</span>
          <span style="font-size: 13px; font-weight: 500; color: var(--text-primary); margin-top: 2px;">${p.route}</span>
        </div>
        <div class="card-spec-item" style="display: flex; flex-direction: column;">
          <span style="font-size: 12px; color: var(--text-muted);">Boarding point</span>
          <span style="font-size: 13px; font-weight: 500; color: var(--text-primary); margin-top: 2px;">${p.boardingStop}</span>
        </div>
        <div class="card-spec-item" style="display: flex; flex-direction: column;">
          <span style="font-size: 12px; color: var(--text-muted);">Bus plate</span>
          <span style="font-size: 13px; font-weight: 500; color: var(--text-primary); margin-top: 2px; font-variant-numeric: tabular-nums;">${p.busId}</span>
        </div>
      </div>

      <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 12px; color: var(--text-muted);">Fee Clearance:</span>
          ${statusBadge}
        </div>
        <span style="font-size: 11px; font-family: monospace; color: var(--text-muted);">${p.passNo || 'SP-2026'} • Verified</span>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeSmartPassModal() {
  const modal = document.getElementById('smartPassModal');
  if (modal) modal.classList.add('hidden');
}

function togglePassengerFeeStatus(passengerId) {
  const p = PASSENGERS_DATA.find(x => x.id === passengerId);
  if (!p) return;

  const nextStatus = p.feeStatus === 'Paid' ? 'Pending' : (p.feeStatus === 'Pending' ? 'Overdue' : 'Paid');
  p.feeStatus = nextStatus;
  playProminentSound('success');
  renderPassengers();
  triggerToast(`Pass fee status for ${p.name} updated to: ${nextStatus}`, 'success');
}

function resetPassengerFilters() {
  const searchInput = document.getElementById('passengerSearchInput');
  if (searchInput) searchInput.value = '';
  
  const passStatusFilter = document.getElementById('passengerPassStatusFilter');
  if (passStatusFilter) passStatusFilter.value = 'all';

  const routeFilter = document.getElementById('passengerRouteFilter');
  if (routeFilter) routeFilter.value = 'all';

  const feeFilter = document.getElementById('passengerFeeStatusFilter');
  if (feeFilter) feeFilter.value = 'all';

  const allTab = document.getElementById('passTabAll');
  if (allTab) {
    setPassengerStatusFilter('all', allTab);
  } else {
    filterPassengers();
  }
  triggerToast('Transport user filters reset to default', 'info');
}

// =============================================================================
// MODALS & PROMINENT ACTIONS (PROMINENT SOUNDS FIRED HERE!)
// =============================================================================

function openDriverModal(id) {
  let driver = null;
  if (id) {
    const q = id.toLowerCase();
    driver = UNIVERSITY_DRIVERS_DATA.find(d => d.id === id || d.name.toLowerCase().includes(q));
    if (!driver) {
      const route = Object.values(BUS_ROUTES_DETAILED).find(r => r.driver && (r.driver.name.toLowerCase().includes(q) || r.id === id));
      if (route) driver = route.driver;
    }
  }
  if (!driver) driver = UNIVERSITY_DRIVERS_DATA[0];

  const pEl = document.getElementById('modalDriverPhoto');
  const nEl = document.getElementById('modalDriverName');
  const sEl = document.getElementById('modalDriverSub');
  const stEl = document.getElementById('modalDriverStatus');
  const phEl = document.getElementById('modalDriverPhone');
  const atEl = document.getElementById('modalDriverAttendance');
  const cBtn = document.getElementById('modalDriverCallBtn');
  const mBtn = document.getElementById('modalDriverMsgBtn');

  if (pEl) pEl.src = driver.photo || 'assets/driver-santosh.jpg';
  if (nEl) nEl.textContent = driver.name;
  if (sEl) sEl.textContent = `Emp ID: ${driver.empId} • ${driver.assignedBus || 'Heavy Transport'}`;
  if (stEl) {
    stEl.textContent = driver.duty || 'Active on duty';
    stEl.className = `badge-clean ${driver.duty === 'Standby' ? 'warning' : 'active'}`;
  }
  if (phEl) phEl.textContent = driver.phone;
  if (atEl) atEl.textContent = driver.attendance || '98% (27/28 Days)';
  if (cBtn) cBtn.setAttribute('onclick', `triggerCall('${driver.phone}')`);
  if (mBtn) mBtn.setAttribute('onclick', `closeDriverModal(); openChatForDriver('${driver.name}')`);

  document.getElementById('driverModal')?.classList.remove('hidden');
}

function closeDriverModal() {
  document.getElementById('driverModal').classList.add('hidden');
}

function openChatForDriver(driverName) {
  navigateTo('chat');
  if (driverName) {
    const firstWord = driverName.split(' ')[0].toLowerCase();
    const conv = CHAT_DATA.find(c => c.name.toLowerCase().includes(firstWord));
    if (conv) {
      selectChat(conv.id);
      return;
    }
  }
  const firstDirect = CHAT_DATA.find(c => c.type !== 'group');
  if (firstDirect) selectChat(firstDirect.id);
}

function formatTimeToAMPM(timeStr) {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const minuteStr = m < 10 ? '0' + m : m;
  return `${h}:${minuteStr} ${period}`;
}

function syncTripTimings() {
  const start = document.getElementById('tripTimeStart')?.value;
  const end = document.getElementById('tripTimeEnd')?.value;
  const target = document.getElementById('tripTimings');
  if (target) {
    if (start && end) {
      target.value = `${formatTimeToAMPM(start)} – ${formatTimeToAMPM(end)}`;
    } else if (start) {
      target.value = formatTimeToAMPM(start);
    }
  }
}

function openNewTripModal() {
  populateTripBusSelect();
  // Clear any existing values so inputs are always fresh and empty
  const modal = document.getElementById('newTripModal');
  if (modal) {
    const form = modal.querySelector('form');
    if (form) form.reset();
  }
  if (AppState.currentBusDetailId) {
    const busSelect = document.getElementById('tripBusSelect');
    if (busSelect) busSelect.value = AppState.currentBusDetailId;
  }
  modal?.classList.remove('hidden');
}

function closeNewTripModal() {
  document.getElementById('newTripModal')?.classList.add('hidden');
}

function handleSaveTrip(e) {
  e.preventDefault();
  playProminentSound('success'); // PROMINENT ACTION SOUND

  const fac = document.getElementById('tripFacultyName')?.value || 'Faculty Member';
  const contact = document.getElementById('tripFacultyContact')?.value || '+91 98450 22391';
  const col = document.getElementById('tripCollege')?.value || 'School of Engineering';
  const busId = document.getElementById('tripBusSelect')?.value || 'bus-u01';
  const desc = document.getElementById('tripDescription')?.value || 'Special Academic Trip';

  // Format Date from calendar input (YYYY-MM-DD -> DD Mon, YYYY)
  const rawDate = document.getElementById('tripDate')?.value || '';
  let dateFormatted = rawDate;
  if (rawDate && rawDate.includes('-')) {
    const parts = rawDate.split('-');
    if (parts.length === 3) {
      const d = new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2]);
      if (!isNaN(d.getTime())) {
        dateFormatted = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    }
  }
  if (!dateFormatted) {
    dateFormatted = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  // Format Timings from clock pickers
  let timings = document.getElementById('tripTimings')?.value || '';
  const timeStart = document.getElementById('tripTimeStart')?.value;
  const timeEnd = document.getElementById('tripTimeEnd')?.value;
  if (timeStart && timeEnd) {
    timings = `${formatTimeToAMPM(timeStart)} – ${formatTimeToAMPM(timeEnd)}`;
  } else if (timeStart) {
    timings = formatTimeToAMPM(timeStart);
  } else if (!timings) {
    timings = '8:30 AM – 4:30 PM';
  }

  const passengers = parseInt(document.getElementById('tripPassengers')?.value) || 40;

  const targetBus = UNIVERSITY_BUSES_DATA.find(b => b.id === busId) || UNIVERSITY_BUSES_DATA[0];
  if (targetBus) {
    const newTrip = {
      id: 'trip-' + Date.now(),
      date: dateFormatted,
      timings: timings,
      reason: desc,
      status: 'Scheduled',
      faculty: fac,
      contact: contact,
      college: col,
      passengers: passengers
    };
    targetBus.tripSchedule.unshift(newTrip);
    if (targetBus.status === 'Operational' || targetBus.status === 'Available') {
      targetBus.status = 'Booked for Special Trip';
    }
  }

  closeNewTripModal();
  renderUniversityBuses();
  updateUnivKPIs();
  populateTripBusSelect();

  if (AppState.currentView === 'bus-detail' && AppState.currentBusDetailId === busId) {
    renderBusDetail(busId);
  }

  triggerToast(`Trip booked for ${targetBus.code} (${desc})`, 'success');
  
  // Directly lead user to inspect the newly booked bus schedule
  setTimeout(() => {
    openBusDetail(targetBus.id);
  }, 350);
}

function openAddStudentModal() {
  document.getElementById('addStudentModal').classList.remove('hidden');
}

function closeAddStudentModal() {
  document.getElementById('addStudentModal').classList.add('hidden');
}

function handleSaveStudent(e) {
  e.preventDefault();
  playProminentSound('success'); // PROMINENT ACTION SOUND

  const id = document.getElementById('studId')?.value || 'ADT23NEW001';
  const name = document.getElementById('studName')?.value || 'New Passenger';
  const type = document.getElementById('studType')?.value || 'Student';
  const dept = document.getElementById('studDept')?.value || 'Institute of Design (IOD)';
  const route = document.getElementById('studRoute')?.value || 'Bus E - Lohegaon';
  const stop = document.getElementById('studBoardingStop')?.value || 'Central Stop';
  const status = document.getElementById('studFeeStatus')?.value || 'Paid';
  const randomPassNo = (type === 'Faculty' ? 'FP-2026-' : 'SP-2026-') + Math.floor(1000 + Math.random() * 9000);

  PASSENGERS_DATA.unshift({
    id: id,
    name: name,
    type: type,
    department: dept,
    year: type === 'Faculty' ? 'Faculty / Staff' : 'Enrolled Student',
    busId: 'MH12-AB-1234',
    route: route,
    boardingStop: stop,
    feeStatus: status,
    passStatus: 'Not collected',
    phone: '+91 98450 ' + Math.floor(10000 + Math.random() * 90000),
    passNo: randomPassNo,
    validUntil: '30 Jun 2026'
  });

  renderPassengers();
  updatePassengersKPIs();
  renderSettingsUsersTable();
  closeAddStudentModal();
  triggerToast(`Enrolled transport user ${name} (${id})!`, 'success');
}

// =============================================================================
// SETTINGS & FLEET ADMINISTRATION SUITE (STRUCTURED DRILL-DOWN SUBPAGE ARCHITECTURE)
// =============================================================================

function openSettingsSubpage(pageKey) {
  const hubView = document.getElementById('settingsHubView');
  const subContainer = document.getElementById('settingsSubpageContainer');
  if (hubView) hubView.classList.add('hidden');
  if (subContainer) subContainer.classList.remove('hidden');

  const panels = ['users', 'buses', 'drivers', 'routes', 'system'];
  panels.forEach(k => {
    const p = document.getElementById(`settingsPanel${k.charAt(0).toUpperCase() + k.slice(1)}`);
    if (p) p.classList.toggle('hidden', k !== pageKey);
  });

  const titles = {
    users: 'Transport Users',
    buses: 'Fleet Buses',
    drivers: 'Drivers Roster',
    routes: 'Transit Routes',
    system: 'System Parameters'
  };

  const breadcrumbEl = document.getElementById('settingsBreadcrumbCurrent');
  if (breadcrumbEl) {
    breadcrumbEl.textContent = titles[pageKey] || 'Overview';
  }

  // Trigger relevant data table rendering
  if (pageKey === 'users') renderSettingsUsersTable();
  else if (pageKey === 'buses') renderSettingsBusesTable();
  else if (pageKey === 'drivers') renderSettingsDriversTable();
  else if (pageKey === 'routes') renderSettingsRoutesTable();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeSettingsSubpage() {
  const hubView = document.getElementById('settingsHubView');
  const subContainer = document.getElementById('settingsSubpageContainer');
  if (hubView) hubView.classList.remove('hidden');
  if (subContainer) subContainer.classList.add('hidden');

  updateSettingsHubBadges();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateSettingsHubBadges() {
  const userBadge = document.querySelector('.settings-nav-item:nth-child(1) .badge-clean');
  if (userBadge && typeof PASSENGERS_DATA !== 'undefined') {
    userBadge.textContent = `${PASSENGERS_DATA.length.toLocaleString()} Enrolled`;
  }
  const busBadge = document.querySelector('.settings-nav-item:nth-child(2) .badge-clean');
  if (busBadge && typeof BUSES_DATA !== 'undefined') {
    busBadge.textContent = `${BUSES_DATA.length} Buses`;
  }
  const driverBadge = document.querySelector('.settings-nav-item:nth-child(3) .badge-clean');
  if (driverBadge && typeof DRIVERS_DATA !== 'undefined') {
    driverBadge.textContent = `${DRIVERS_DATA.length} Drivers`;
  }
  const routeBadge = document.querySelector('.settings-nav-item:nth-child(4) .badge-clean');
  if (routeBadge && typeof ROUTES_DATA !== 'undefined') {
    routeBadge.textContent = `${ROUTES_DATA.length} Corridors`;
  }
}

function switchSettingsTab(tab) {
  openSettingsSubpage(tab);
}

// --- 1. TRANSPORT USERS MANAGEMENT (STUDENTS & FACULTY) ---
function renderSettingsUsersTable() {
  const tbody = document.getElementById('settingsUsersTableBody');
  if (!tbody) return;

  const q = (document.getElementById('settingsUserSearch')?.value || '').toLowerCase().trim();
  const roleFilter = document.getElementById('settingsUserRoleFilter')?.value || 'all';
  const feeFilter = document.getElementById('settingsUserFeeFilter')?.value || 'all';

  const filtered = PASSENGERS_DATA.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.route.toLowerCase().includes(q);
    const matchRole = roleFilter === 'all' || p.type.toLowerCase() === roleFilter.toLowerCase();
    const matchFee = feeFilter === 'all' || p.feeStatus.toLowerCase() === feeFilter.toLowerCase();
    return matchQ && matchRole && matchFee;
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 24px;">No transport users found matching filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const feeClass = p.feeStatus === 'Paid' ? 'operational' : (p.feeStatus === 'Pending' ? 'warning' : 'danger');
    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="chat-item-avatar" style="width: 28px; height: 28px; font-size: 11px; background: ${p.type === 'Faculty' ? 'var(--blue)' : 'var(--accent)'}; color: #fff;">
              ${p.name.charAt(0)}
            </div>
            <div>
              <div style="font-weight: 600; color: var(--text-primary);">${p.name}</div>
              <div style="font-size: 11px; color: var(--text-muted);">${p.phone}</div>
            </div>
          </div>
        </td>
        <td><code>${p.id}</code></td>
        <td><span class="badge-clean ${p.type === 'Faculty' ? 'blue' : ''}">${p.type}</span></td>
        <td style="color: var(--text-secondary); max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.department}</td>
        <td><span style="font-size: 12px; font-weight: 500;">${p.route}</span></td>
        <td><span class="badge-clean ${feeClass}">${p.feeStatus}</span></td>
        <td>
          <div class="settings-table-actions">
            <button class="btn-table-action" onclick="openEditPassengerModal('${p.id}')" title="Edit Profile">
              <i class="ph ph-pencil-simple"></i> Edit
            </button>
            <button class="btn-table-action" onclick="openSmartPassModal('${p.id}')" title="Inspect Smart Pass">
              <i class="ph ph-identification-card"></i> Pass
            </button>
            <button class="btn-table-action danger" onclick="confirmRemoveStudent('${p.id}')" title="Remove from Transit Registry">
              <i class="ph ph-trash"></i> Remove
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function confirmRemoveStudent(id) {
  const student = PASSENGERS_DATA.find(p => p.id === id);
  if (!student) return;

  openConfirmDeleteModal(
    'Remove Transport User',
    `Are you sure you want to remove <strong>${student.name} (${student.id})</strong> from the campus transit registry? Their active RFID smart bus pass will be permanently revoked.`,
    () => {
      const idx = PASSENGERS_DATA.findIndex(p => p.id === id);
      if (idx !== -1) {
        PASSENGERS_DATA.splice(idx, 1);
        renderSettingsUsersTable();
        renderPassengers();
        updatePassengersKPIs();
        playProminentSound('success');
        triggerToast(`Removed transport user ${student.name} (${id}) from transit registry`, 'info');
      }
    }
  );
}

// --- 2. FLEET BUSES MANAGEMENT ---
function openAddBusModal() {
  const modal = document.getElementById('addBusModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAddBusModal() {
  const modal = document.getElementById('addBusModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveBus(e) {
  e.preventDefault();
  playProminentSound('success');

  const code = document.getElementById('newBusCode')?.value.trim() || 'Bus U-14';
  const plate = document.getElementById('newBusPlate')?.value.trim().toUpperCase() || 'MH12-PQ-9081';
  const model = document.getElementById('newBusModel')?.value.trim() || 'Ashok Leyland 49 Deluxe High-Deck';
  const cap = parseInt(document.getElementById('newBusCapacity')?.value) || 49;
  const owner = document.getElementById('newBusOwner')?.value || 'MIT ADT University Owned';
  const corridor = document.getElementById('newBusCorridor')?.value || 'Campus Transit Shuttle';
  const status = document.getElementById('newBusStatus')?.value || 'Operational';

  const busNum = (UNIVERSITY_BUSES_DATA.length + 1).toString().padStart(2, '0');
  const newBusId = `bus-u${busNum}`;

  UNIVERSITY_BUSES_DATA.unshift({
    id: newBusId,
    code: code,
    plate: plate,
    reg: `Coach #${busNum}   REG-${Math.floor(1000 + Math.random() * 9000)}`,
    model: model,
    capacity: cap,
    status: status,
    owner: owner,
    mileage: '0 km (Newly Added)',
    fuel: '100% (Diesel / CNG Clean)',
    driver: 'Designated Standby',
    tripsCompleted: 0,
    corridor: corridor,
    maintenanceHistory: []
  });

  if (!UNIVERSITY_BUS_SCHEDULES[newBusId]) {
    UNIVERSITY_BUS_SCHEDULES[newBusId] = { trips: [] };
  }

  renderSettingsBusesTable();
  renderUniversityBuses();
  populateTripBusSelect();
  updateUnivKPIs();
  closeAddBusModal();
  e.target.reset();
  triggerToast(`Registered new coach ${code} (${plate}) to fleet!`, 'success');
}

function renderSettingsBusesTable() {
  const tbody = document.getElementById('settingsBusesTableBody');
  if (!tbody) return;

  const q = (document.getElementById('settingsBusSearch')?.value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('settingsBusStatusFilter')?.value || 'all';

  const filtered = UNIVERSITY_BUSES_DATA.filter(b => {
    const matchQ = !q || b.code.toLowerCase().includes(q) || b.plate.toLowerCase().includes(q) || b.model.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || b.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchQ && matchStatus;
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">No fleet buses match filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(b => {
    const isOperational = b.status === 'Operational';
    return `
      <tr>
        <td><strong>${b.code}</strong></td>
        <td><code>${b.plate}</code></td>
        <td>
          <div style="font-weight: 500;">${b.model}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${b.owner}</div>
        </td>
        <td>${b.capacity} Seats</td>
        <td style="color: var(--text-secondary);">${b.driver || 'Standby Driver'}</td>
        <td><span style="font-size: 12px;">${b.corridor || 'University Operations'}</span></td>
        <td><span class="badge-clean ${isOperational ? 'operational' : 'warning'}">${b.status}</span></td>
        <td>
          <div class="settings-table-actions">
            <button class="btn-table-action" onclick="openBusDetail('${b.id}')" title="Inspect Vehicle Logs">
              <i class="ph ph-eye"></i> Details
            </button>
            <button class="btn-table-action danger" onclick="confirmRemoveBus('${b.id}')" title="Decommission from Fleet">
              <i class="ph ph-trash"></i> Remove
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function confirmRemoveBus(busId) {
  const bus = UNIVERSITY_BUSES_DATA.find(b => b.id === busId);
  if (!bus) return;

  openConfirmDeleteModal(
    'Decommission Fleet Bus',
    `Are you sure you want to decommission and remove coach <strong>${bus.code} (${bus.plate})</strong> from the campus transit fleet? Active route assignments will need manual re-dispatching.`,
    () => {
      const idx = UNIVERSITY_BUSES_DATA.findIndex(b => b.id === busId);
      if (idx !== -1) {
        UNIVERSITY_BUSES_DATA.splice(idx, 1);
        renderSettingsBusesTable();
        renderUniversityBuses();
        populateTripBusSelect();
        updateUnivKPIs();
        playProminentSound('success');
        triggerToast(`Decommissioned bus ${bus.code} (${bus.plate})`, 'info');
      }
    }
  );
}

// --- 3. DRIVERS ROSTER MANAGEMENT ---
function openAddDriverModal() {
  const modal = document.getElementById('addDriverModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAddDriverModal() {
  const modal = document.getElementById('addDriverModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveDriver(e) {
  e.preventDefault();
  playProminentSound('success');

  const name = document.getElementById('newDriverName')?.value.trim() || 'New Driver';
  const empId = document.getElementById('newDriverEmpId')?.value.trim() || 'MIT-DRV-115';
  const phone = document.getElementById('newDriverPhone')?.value.trim() || '+91 98220 12345';
  const dl = document.getElementById('newDriverLicense')?.value.trim() || 'MH12-2022-DL90812';
  const bus = document.getElementById('newDriverBus')?.value.trim() || 'Standby Fleet';
  const duty = document.getElementById('newDriverDuty')?.value || 'On Duty';
  const exp = document.getElementById('newDriverExp')?.value || '4.5 Years';
  const rating = document.getElementById('newDriverRating')?.value || '4.9 / 5.0';

  const drvNum = (UNIVERSITY_DRIVERS_DATA.length + 1).toString().padStart(2, '0');
  const newDrvId = `drv-u${drvNum}`;

  UNIVERSITY_DRIVERS_DATA.unshift({
    id: newDrvId,
    name: name,
    photo: 'assets/driver-santosh.jpg',
    phone: phone,
    empId: empId,
    license: dl,
    assignedBus: bus,
    duty: duty,
    attendance: '100% (New)',
    exp: exp,
    rating: rating
  });

  renderSettingsDriversTable();
  renderUniversityDrivers();
  renderDedicatedDrivers();
  closeAddDriverModal();
  e.target.reset();
  triggerToast(`Enrolled driver ${name} (${empId}) to transit roster!`, 'success');
}

function renderSettingsDriversTable() {
  const tbody = document.getElementById('settingsDriversTableBody');
  if (!tbody) return;

  const q = (document.getElementById('settingsDriverSearch')?.value || '').toLowerCase().trim();
  const dutyFilter = document.getElementById('settingsDriverDutyFilter')?.value || 'all';

  const filtered = UNIVERSITY_DRIVERS_DATA.filter(d => {
    const matchQ = !q || d.name.toLowerCase().includes(q) || d.empId.toLowerCase().includes(q) || d.assignedBus.toLowerCase().includes(q);
    const matchDuty = dutyFilter === 'all' || d.duty.toLowerCase() === dutyFilter.toLowerCase();
    return matchQ && matchDuty;
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">No drivers match filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(d => {
    const isOnDuty = d.duty === 'On Duty';
    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="${d.photo || 'assets/driver-santosh.jpg'}" alt="${d.name}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">
            <span style="font-weight: 600; color: var(--text-primary);">${d.name}</span>
          </div>
        </td>
        <td><code>${d.empId}</code></td>
        <td>
          <a href="tel:${d.phone}" style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 4px; font-variant-numeric: tabular-nums;">
            <i class="ph ph-phone"></i> ${d.phone}
          </a>
        </td>
        <td><code>${d.license}</code></td>
        <td><strong>${d.assignedBus}</strong></td>
        <td><span class="badge-clean ${isOnDuty ? 'operational' : 'warning'}">${d.duty}</span></td>
        <td><span style="font-weight: 500; font-size: 12px; color: var(--status-orange);">${d.rating}</span></td>
        <td>
          <div class="settings-table-actions">
            <button class="btn-table-action" onclick="triggerCall('${d.phone}')" title="Call Driver">
              <i class="ph ph-phone-call"></i> Call
            </button>
            <button class="btn-table-action danger" onclick="confirmRemoveDriver('${d.id}')" title="Offboard from Roster">
              <i class="ph ph-trash"></i> Remove
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function confirmRemoveDriver(drvId) {
  const drv = UNIVERSITY_DRIVERS_DATA.find(d => d.id === drvId);
  if (!drv) return;

  openConfirmDeleteModal(
    'Offboard Transit Driver',
    `Are you sure you want to offboard driver <strong>${drv.name} (${drv.empId})</strong> from the transit fleet roster? Their active heavy vehicle authorization will be archived.`,
    () => {
      const idx = UNIVERSITY_DRIVERS_DATA.findIndex(d => d.id === drvId);
      if (idx !== -1) {
        UNIVERSITY_DRIVERS_DATA.splice(idx, 1);
        renderSettingsDriversTable();
        renderUniversityDrivers();
        renderDedicatedDrivers();
        playProminentSound('success');
        triggerToast(`Offboarded driver ${drv.name} from transit roster`, 'info');
      }
    }
  );
}

// --- 4. TRANSIT ROUTES MANAGEMENT ---
function openAddRouteModal() {
  const modal = document.getElementById('addRouteModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAddRouteModal() {
  const modal = document.getElementById('addRouteModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveRoute(e) {
  e.preventDefault();
  playProminentSound('success');

  const id = document.getElementById('newRouteId')?.value.trim().toLowerCase() || `bus-${Date.now()}`;
  const name = document.getElementById('newRouteName')?.value.trim() || 'Bus New Corridor';
  const origin = document.getElementById('newRouteOrigin')?.value.trim() || 'Origin Landmark';
  const dest = document.getElementById('newRouteDest')?.value.trim() || 'MIT Campus Loni';
  const stops = parseInt(document.getElementById('newRouteStops')?.value) || 9;
  const time = document.getElementById('newRouteTime')?.value.trim() || '45 mins';
  const cap = parseInt(document.getElementById('newRouteCap')?.value) || 49;
  const busPlate = document.getElementById('newRouteBus')?.value.trim() || 'MH12-GH-8812';
  const driverName = document.getElementById('newRouteDriver')?.value.trim() || 'Tanaji More';

  ROUTES_DATA.push({
    id: id,
    name: name,
    origin: origin,
    dest: dest,
    stops: stops,
    time: time,
    bus: busPlate,
    enrolled: 0,
    cap: cap,
    status: 'active',
    driver: driverName
  });

  BUS_ROUTES_DETAILED[id] = {
    id: id,
    name: name,
    corridor: `${origin} Corridor → ${dest}`,
    origin: origin,
    dest: dest,
    status: 'active',
    departure: '07:15 AM',
    arrival: '08:30 AM',
    time: time,
    stopsCount: stops,
    cap: cap,
    bus: {
      plate: busPlate,
      reg: `MH12-REG-${Math.floor(1000 + Math.random() * 9000)}`,
      capacity: `${cap} Seats (Deluxe High-Deck)`,
      status: 'Operational',
      owner: 'MIT ADT University Owned',
      fuel: '95% (CNG Clean)'
    },
    driver: {
      name: driverName,
      photo: 'assets/driver-santosh.jpg',
      phone: '+91 98220 ' + Math.floor(10000 + Math.random() * 90000),
      empId: 'MIT-DRV-' + Math.floor(115 + Math.random() * 50),
      duty: 'On Duty',
      attendance: '98% (27/28 Days)',
      exp: '4.8 Years',
      rating: '4.9'
    },
    stops: [
      { number: 1, name: origin, time: '07:15 AM', distance: '0.0 km', boardingCount: 6, lat: 18.5204, lng: 73.8567 },
      { number: 2, name: 'Intermediate Junction', time: '07:35 AM', distance: '8.4 km', boardingCount: 14, lat: 18.5089, lng: 73.9259 },
      { number: 3, name: dest, time: '08:30 AM', distance: '24.2 km', boardingCount: 0, lat: 18.4903, lng: 74.0253 }
    ],
    passengers: []
  };

  renderSettingsRoutesTable();
  renderRoutesDirectory();
  closeAddRouteModal();
  e.target.reset();
  triggerToast(`Commissioned new transit corridor ${name}!`, 'success');
}

function renderSettingsRoutesTable() {
  const tbody = document.getElementById('settingsRoutesTableBody');
  if (!tbody) return;

  const q = (document.getElementById('settingsRouteSearch')?.value || '').toLowerCase().trim();

  const filtered = ROUTES_DATA.filter(r => {
    return !q || r.name.toLowerCase().includes(q) || r.origin.toLowerCase().includes(q) || r.bus.toLowerCase().includes(q);
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">No routes match filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(r => {
    const isActive = r.status === 'active';
    return `
      <tr>
        <td><strong>${r.name}</strong></td>
        <td>${r.origin}</td>
        <td>${r.dest}</td>
        <td><span class="badge-clean">${r.stops} Stops</span></td>
        <td style="font-variant-numeric: tabular-nums;">${r.time}</td>
        <td><code>${r.bus}</code></td>
        <td><span class="badge-clean ${isActive ? 'operational' : 'danger'}">${isActive ? 'Active' : 'Maintenance'}</span></td>
        <td>
          <div class="settings-table-actions">
            <button class="btn-table-action" onclick="openRouteDetail('${r.id}')" title="Open Corridor View">
              <i class="ph ph-arrow-square-out"></i> View
            </button>
            <button class="btn-table-action danger" onclick="confirmRemoveRoute('${r.id}')" title="Decommission Route">
              <i class="ph ph-trash"></i> Remove
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function confirmRemoveRoute(routeId) {
  const route = ROUTES_DATA.find(r => r.id === routeId);
  if (!route) return;

  openConfirmDeleteModal(
    'Decommission Transit Route',
    `Are you sure you want to decommission transit corridor <strong>${route.name}</strong>? Any linked scheduling, student allotments, and live GPS tracking for this route will be halted.`,
    () => {
      const idx = ROUTES_DATA.findIndex(r => r.id === routeId);
      if (idx !== -1) {
        ROUTES_DATA.splice(idx, 1);
        renderSettingsRoutesTable();
        renderRoutesDirectory();
        playProminentSound('success');
        triggerToast(`Decommissioned route ${route.name}`, 'info');
      }
    }
  );
}

// --- 5. GENERIC CONFIRMATION DIALOG CONTROLLER ---
let pendingConfirmCallback = null;

function openConfirmDeleteModal(title, message, onConfirm) {
  const modal = document.getElementById('confirmDeleteModal');
  const titleEl = document.getElementById('confirmModalTitle');
  const msgEl = document.getElementById('confirmModalMessage');
  const proceedBtn = document.getElementById('confirmModalProceedBtn');

  if (titleEl) titleEl.innerHTML = `<i class="ph ph-warning-circle"></i> ${title}`;
  if (msgEl) msgEl.innerHTML = message;

  pendingConfirmCallback = onConfirm;
  if (proceedBtn) {
    proceedBtn.onclick = () => {
      if (typeof pendingConfirmCallback === 'function') {
        pendingConfirmCallback();
      }
      closeConfirmDeleteModal();
    };
  }

  if (modal) modal.classList.remove('hidden');
}

function closeConfirmDeleteModal() {
  const modal = document.getElementById('confirmDeleteModal');
  if (modal) modal.classList.add('hidden');
  pendingConfirmCallback = null;
}

// --- 6. MASTER DATABASE BACKUP EXPORT ---
function exportMasterTransitBackup() {
  const backupData = {
    exportDate: new Date().toISOString(),
    university: 'MIT ADT University Campus Transportation Division',
    passengersCount: PASSENGERS_DATA.length,
    fleetBusesCount: UNIVERSITY_BUSES_DATA.length,
    driversCount: UNIVERSITY_DRIVERS_DATA.length,
    routesCount: ROUTES_DATA.length,
    passengers: PASSENGERS_DATA,
    fleetBuses: UNIVERSITY_BUSES_DATA,
    drivers: UNIVERSITY_DRIVERS_DATA,
    routes: ROUTES_DATA
  };

  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MIT_Transit_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  playProminentSound('success');
  triggerToast('Master Transit Database exported as JSON backup!', 'success');
}

function openAddExpenseModal() {
  const amt = prompt('Enter Internal Transit Expense (₹):', '12500');
  if (amt) {
    playProminentSound('success'); // PROMINENT ACTION SOUND
    triggerToast(`Expense voucher logged for ₹${amt}`, 'success');
  }
}

function viewInvoice(no) {
  alert(`TARAWADE LOGISTICS FLEET\nInvoice: ${no}\nBilling: October 2026\nContract: 24 Campus Buses\nAmount: ₹3,40,000 (Cleared via RTGS)`);
}

function triggerCall(num) {
  triggerToast(`Connecting secure dispatch VoIP to ${num}...`, 'info');
}

function handleGlobalSearch(q) {
  if (!q) return;
  q = q.toLowerCase();
  if (q.includes('rout')) navigateTo('routes');
  else if (q.includes('bus')) navigateTo('buses');
  else if (q.includes('chat')) navigateTo('chat');
  else if (q.includes('comp') || q.includes('curtain')) navigateTo('complaints');
  else if (q.includes('stud') || q.includes('pass')) navigateTo('passengers');
  else if (q.includes('fin') || q.includes('bill')) navigateTo('finances');
  else if (q.includes('sett') || q.includes('admin')) navigateTo('settings');
}

// =============================================================================
// TOAST NOTIFICATIONS (CLEAN FLAT NOTIFICATIONS)
// =============================================================================

function triggerToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-flat';
  toast.innerHTML = `<i class="ph ph-check-circle"></i> <span>${msg}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 200);
  }, 2600);
}

// =============================================================================
// HOSTEL STUDENTS ONE-TIME TRAVEL (₹150 PASSES) AUDIT LEDGER DATASET
// Total: 36 records • ₹150 each = ₹5,400 (Matches Home Card 4 & Finances Card 5)
// =============================================================================

const HOSTEL_ONE_TIME_DATA = [
  { id: 'HST-150-01', receiptNo: '#RCP-150-1042', date: '2026-10-15', dateOnly: '15 Oct 2026', studentName: 'Aarav Kulkarni', rollNo: 'ADT23IODB1042', busName: 'Bus A', routeDirection: 'Campus → Nigdi', hostel: 'Bageshree Girls Hostel • Room 304', payMode: 'UPI (GooglePay)', utr: 'UPI/42918821034', amount: 150 },
  { id: 'HST-150-02', receiptNo: '#RCP-150-1041', date: '2026-10-15', dateOnly: '15 Oct 2026', studentName: 'Tanvi Deshmukh', rollNo: 'ADT23IODB2184', busName: 'Bus E', routeDirection: 'Lohegaon → Campus', hostel: 'Saraswati Girls Hostel • Room 205', payMode: 'UPI (PhonePe)', utr: 'UPI/88392019482', amount: 150 },
  { id: 'HST-150-03', receiptNo: '#RCP-150-1040', date: '2026-10-15', dateOnly: '15 Oct 2026', studentName: 'Rohan Joshi', rollNo: 'ADT23IODB3095', busName: 'Bus B', routeDirection: 'Campus → Chaphekar', hostel: 'Indrayani Boys Hostel • Room 112', payMode: 'Cash at Depot Counter', utr: 'CASH-GATE-088', amount: 150 },
  { id: 'HST-150-04', receiptNo: '#RCP-150-1039', date: '2026-10-15', dateOnly: '15 Oct 2026', studentName: 'Sneha Patil', rollNo: 'ADT23IODB4112', busName: 'Bus C', routeDirection: 'Swargate → Campus', hostel: 'Godavari Girls Hostel • Room 401', payMode: 'UPI (Paytm)', utr: 'UPI/99102834571', amount: 150 },
  { id: 'HST-150-05', receiptNo: '#RCP-150-1038', date: '2026-10-15', dateOnly: '15 Oct 2026', studentName: 'Aditya Shinde', rollNo: 'ADT23IODB5820', busName: 'Bus D', routeDirection: 'Campus → Moshi', hostel: 'Vishwa Boys Hostel • Room 218', payMode: 'UPI (GooglePay)', utr: 'UPI/66183920194', amount: 150 },
  { id: 'HST-150-06', receiptNo: '#RCP-150-1037', date: '2026-10-15', dateOnly: '15 Oct 2026', studentName: 'Priya Mahajan', rollNo: 'ADT23IODB6239', busName: 'Bus F', routeDirection: 'Pashan → Campus', hostel: 'Bageshree Girls Hostel • Room 118', payMode: 'UPI (PhonePe)', utr: 'UPI/12093849502', amount: 150 },
  { id: 'HST-150-07', receiptNo: '#RCP-150-1036', date: '2026-10-15', dateOnly: '15 Oct 2026', studentName: 'Kunal Gaikwad', rollNo: 'ADT23IODB7415', busName: 'Bus A', routeDirection: 'Nigdi → Campus', hostel: 'Indrayani Boys Hostel • Room 305', payMode: 'UPI (GooglePay)', utr: 'UPI/55829103482', amount: 150 },
  { id: 'HST-150-08', receiptNo: '#RCP-150-1035', date: '2026-10-15', dateOnly: '15 Oct 2026', studentName: 'Isha Nair', rollNo: 'ADT23IODB8902', busName: 'Bus E', routeDirection: 'Campus → Lohegaon', hostel: 'Saraswati Girls Hostel • Room 102', payMode: 'Cash at Depot Counter', utr: 'CASH-GATE-089', amount: 150 },
  { id: 'HST-150-09', receiptNo: '#RCP-150-1034', date: '2026-10-14', dateOnly: '14 Oct 2026', studentName: 'Siddharth Rao', rollNo: 'ADT23IODB1156', busName: 'Bus B', routeDirection: 'Chaphekar → Campus', hostel: 'Vishwa Boys Hostel • Room 104', payMode: 'UPI (GooglePay)', utr: 'UPI/33019482910', amount: 150 },
  { id: 'HST-150-10', receiptNo: '#RCP-150-1033', date: '2026-10-14', dateOnly: '14 Oct 2026', studentName: 'Ananya Sharma', rollNo: 'ADT23IODB2341', busName: 'Bus A', routeDirection: 'Campus → Nigdi', hostel: 'Bageshree Girls Hostel • Room 212', payMode: 'UPI (PhonePe)', utr: 'UPI/77182930491', amount: 150 },
  { id: 'HST-150-11', receiptNo: '#RCP-150-1032', date: '2026-10-14', dateOnly: '14 Oct 2026', studentName: 'Harsh Vardhan', rollNo: 'ADT23IODB3478', busName: 'Bus C', routeDirection: 'Campus → Swargate', hostel: 'Indrayani Boys Hostel • Room 220', payMode: 'UPI (Paytm)', utr: 'UPI/44910293847', amount: 150 },
  { id: 'HST-150-12', receiptNo: '#RCP-150-1031', date: '2026-10-14', dateOnly: '14 Oct 2026', studentName: 'Meera Chougule', rollNo: 'ADT23IODB4590', busName: 'Bus D', routeDirection: 'Moshi → Campus', hostel: 'Godavari Girls Hostel • Room 309', payMode: 'Cash at Depot Counter', utr: 'CASH-GATE-082', amount: 150 },
  { id: 'HST-150-13', receiptNo: '#RCP-150-1030', date: '2026-10-14', dateOnly: '14 Oct 2026', studentName: 'Vikram Jadhav', rollNo: 'ADT23IODB5612', busName: 'Bus E', routeDirection: 'Lohegaon → Campus', hostel: 'Vishwa Boys Hostel • Room 311', payMode: 'UPI (GooglePay)', utr: 'UPI/99201948572', amount: 150 },
  { id: 'HST-150-14', receiptNo: '#RCP-150-1029', date: '2026-10-14', dateOnly: '14 Oct 2026', studentName: 'Riya Kadam', rollNo: 'ADT23IODB6783', busName: 'Bus F', routeDirection: 'Campus → Pashan', hostel: 'Saraswati Girls Hostel • Room 314', payMode: 'UPI (GooglePay)', utr: 'UPI/66102938401', amount: 150 },
  { id: 'HST-150-15', receiptNo: '#RCP-150-1028', date: '2026-10-14', dateOnly: '14 Oct 2026', studentName: 'Nikhil Rane', rollNo: 'ADT23IODB7894', busName: 'Bus A', routeDirection: 'Nigdi → Campus', hostel: 'Indrayani Boys Hostel • Room 402', payMode: 'UPI (PhonePe)', utr: 'UPI/88301928491', amount: 150 },
  { id: 'HST-150-16', receiptNo: '#RCP-150-1027', date: '2026-10-14', dateOnly: '14 Oct 2026', studentName: 'Pooja Agarwal', rollNo: 'ADT23IODB8921', busName: 'Bus B', routeDirection: 'Campus → Chaphekar', hostel: 'Bageshree Girls Hostel • Room 408', payMode: 'UPI (Paytm)', utr: 'UPI/22019485729', amount: 150 },
  { id: 'HST-150-17', receiptNo: '#RCP-150-1026', date: '2026-10-14', dateOnly: '14 Oct 2026', studentName: 'Saurabh Salunkhe', rollNo: 'ADT23IODB9034', busName: 'Bus C', routeDirection: 'Swargate → Campus', hostel: 'Vishwa Boys Hostel • Room 207', payMode: 'Cash at Depot Counter', utr: 'CASH-GATE-083', amount: 150 },
  { id: 'HST-150-18', receiptNo: '#RCP-150-1025', date: '2026-10-14', dateOnly: '14 Oct 2026', studentName: 'Shreya Tiwari', rollNo: 'ADT23IODB1245', busName: 'Bus E', routeDirection: 'Campus → Lohegaon', hostel: 'Godavari Girls Hostel • Room 115', payMode: 'UPI (GooglePay)', utr: 'UPI/44019284758', amount: 150 },
  { id: 'HST-150-19', receiptNo: '#RCP-150-1024', date: '2026-10-13', dateOnly: '13 Oct 2026', studentName: 'Amitabh Sen', rollNo: 'ADT23IODB2356', busName: 'Bus A', routeDirection: 'Campus → Nigdi', hostel: 'Indrayani Boys Hostel • Room 118', payMode: 'UPI (GooglePay)', utr: 'UPI/11928475820', amount: 150 },
  { id: 'HST-150-20', receiptNo: '#RCP-150-1023', date: '2026-10-13', dateOnly: '13 Oct 2026', studentName: 'Kavita Menon', rollNo: 'ADT23IODB3467', busName: 'Bus E', routeDirection: 'Lohegaon → Campus', hostel: 'Saraswati Girls Hostel • Room 222', payMode: 'UPI (PhonePe)', utr: 'UPI/99018274619', amount: 150 },
  { id: 'HST-150-21', receiptNo: '#RCP-150-1022', date: '2026-10-13', dateOnly: '13 Oct 2026', studentName: 'Yash Bhosale', rollNo: 'ADT23IODB4578', busName: 'Bus D', routeDirection: 'Campus → Moshi', hostel: 'Vishwa Boys Hostel • Room 119', payMode: 'UPI (GooglePay)', utr: 'UPI/55019284710', amount: 150 },
  { id: 'HST-150-22', receiptNo: '#RCP-150-1021', date: '2026-10-13', dateOnly: '13 Oct 2026', studentName: 'Diya Chakraborty', rollNo: 'ADT23IODB5689', busName: 'Bus B', routeDirection: 'Chaphekar → Campus', hostel: 'Bageshree Girls Hostel • Room 316', payMode: 'UPI (Paytm)', utr: 'UPI/88201948571', amount: 150 },
  { id: 'HST-150-23', receiptNo: '#RCP-150-1020', date: '2026-10-13', dateOnly: '13 Oct 2026', studentName: 'Gaurav Kulkarni', rollNo: 'ADT23IODB6790', busName: 'Bus F', routeDirection: 'Campus → Pashan', hostel: 'Indrayani Boys Hostel • Room 309', payMode: 'Cash at Depot Counter', utr: 'CASH-GATE-079', amount: 150 },
  { id: 'HST-150-24', receiptNo: '#RCP-150-1019', date: '2026-10-13', dateOnly: '13 Oct 2026', studentName: 'Simran Kaur', rollNo: 'ADT23IODB7801', busName: 'Bus C', routeDirection: 'Swargate → Campus', hostel: 'Godavari Girls Hostel • Room 208', payMode: 'UPI (GooglePay)', utr: 'UPI/33910284751', amount: 150 },
  { id: 'HST-150-25', receiptNo: '#RCP-150-1018', date: '2026-10-13', dateOnly: '13 Oct 2026', studentName: 'Varun Pillai', rollNo: 'ADT23IODB8912', busName: 'Bus A', routeDirection: 'Nigdi → Campus', hostel: 'Vishwa Boys Hostel • Room 325', payMode: 'UPI (PhonePe)', utr: 'UPI/66192847590', amount: 150 },
  { id: 'HST-150-26', receiptNo: '#RCP-150-1017', date: '2026-10-12', dateOnly: '12 Oct 2026', studentName: 'Manish Pandey', rollNo: 'ADT23IODB9023', busName: 'Bus E', routeDirection: 'Campus → Lohegaon', hostel: 'Indrayani Boys Hostel • Room 215', payMode: 'UPI (GooglePay)', utr: 'UPI/77102938475', amount: 150 },
  { id: 'HST-150-27', receiptNo: '#RCP-150-1016', date: '2026-10-12', dateOnly: '12 Oct 2026', studentName: 'Aishwarya Shetty', rollNo: 'ADT23IODB1357', busName: 'Bus A', routeDirection: 'Campus → Nigdi', hostel: 'Bageshree Girls Hostel • Room 107', payMode: 'UPI (PhonePe)', utr: 'UPI/22194857201', amount: 150 },
  { id: 'HST-150-28', receiptNo: '#RCP-150-1015', date: '2026-10-12', dateOnly: '12 Oct 2026', studentName: 'Omkar Sawant', rollNo: 'ADT23IODB2468', busName: 'Bus B', routeDirection: 'Chaphekar → Campus', hostel: 'Vishwa Boys Hostel • Room 214', payMode: 'Cash at Depot Counter', utr: 'CASH-GATE-074', amount: 150 },
  { id: 'HST-150-29', receiptNo: '#RCP-150-1014', date: '2026-10-12', dateOnly: '12 Oct 2026', studentName: 'Ritika Gupta', rollNo: 'ADT23IODB3579', busName: 'Bus D', routeDirection: 'Campus → Moshi', hostel: 'Saraswati Girls Hostel • Room 308', payMode: 'UPI (Paytm)', utr: 'UPI/55102938472', amount: 150 },
  { id: 'HST-150-30', receiptNo: '#RCP-150-1013', date: '2026-10-12', dateOnly: '12 Oct 2026', studentName: 'Tejas More', rollNo: 'ADT23IODB4680', busName: 'Bus C', routeDirection: 'Campus → Swargate', hostel: 'Indrayani Boys Hostel • Room 107', payMode: 'UPI (GooglePay)', utr: 'UPI/99102837461', amount: 150 },
  { id: 'HST-150-31', receiptNo: '#RCP-150-1012', date: '2026-10-12', dateOnly: '12 Oct 2026', studentName: 'Natasha Dsouza', rollNo: 'ADT23IODB5791', busName: 'Bus F', routeDirection: 'Pashan → Campus', hostel: 'Godavari Girls Hostel • Room 311', payMode: 'UPI (GooglePay)', utr: 'UPI/44019283745', amount: 150 },
  { id: 'HST-150-32', receiptNo: '#RCP-150-1011', date: '2026-10-11', dateOnly: '11 Oct 2026', studentName: 'Pranav Date', rollNo: 'ADT23IODB6802', busName: 'Bus A', routeDirection: 'Nigdi → Campus', hostel: 'Vishwa Boys Hostel • Room 110', payMode: 'UPI (GooglePay)', utr: 'UPI/88192039485', amount: 150 },
  { id: 'HST-150-33', receiptNo: '#RCP-150-1010', date: '2026-10-11', dateOnly: '11 Oct 2026', studentName: 'Bhavna Rathod', rollNo: 'ADT23IODB7913', busName: 'Bus E', routeDirection: 'Lohegaon → Campus', hostel: 'Bageshree Girls Hostel • Room 204', payMode: 'UPI (PhonePe)', utr: 'UPI/33019284719', amount: 150 },
  { id: 'HST-150-34', receiptNo: '#RCP-150-1009', date: '2026-10-11', dateOnly: '11 Oct 2026', studentName: 'Chirag Sethi', rollNo: 'ADT23IODB8024', busName: 'Bus B', routeDirection: 'Campus → Chaphekar', hostel: 'Indrayani Boys Hostel • Room 314', payMode: 'UPI (GooglePay)', utr: 'UPI/66102938471', amount: 150 },
  { id: 'HST-150-35', receiptNo: '#RCP-150-1008', date: '2026-10-11', dateOnly: '11 Oct 2026', studentName: 'Sayali Jagtap', rollNo: 'ADT23IODB9135', busName: 'Bus C', routeDirection: 'Swargate → Campus', hostel: 'Saraswati Girls Hostel • Room 110', payMode: 'UPI (Paytm)', utr: 'UPI/11029384756', amount: 150 },
  { id: 'HST-150-36', receiptNo: '#RCP-150-1007', date: '2026-10-11', dateOnly: '11 Oct 2026', studentName: 'Abhishek Mishra', rollNo: 'ADT23IODB1470', busName: 'Bus D', routeDirection: 'Moshi → Campus', hostel: 'Vishwa Boys Hostel • Room 202', payMode: 'Cash at Depot Counter', utr: 'CASH-GATE-071', amount: 150 },
];


// =============================================================================
// FINANCES SEGMENTED NAVIGATION & TIME TRAVELER LEDGER CONTROLLERS
// =============================================================================

function switchFinancesTab(tab) {
  const btnBoth = document.getElementById('tabBtnFinBoth');
  const btnStudents = document.getElementById('tabBtnFinStudents');
  const btnInvoices = document.getElementById('tabBtnFinInvoices');
  const cardStudents = document.getElementById('hostelOneTimeSection');
  const cardInvoices = document.getElementById('cardTarawadeInvoices');

  [btnBoth, btnStudents, btnInvoices].forEach(b => { if (b) b.classList.remove('active'); });

  if (tab === 'students') {
    if (btnStudents) btnStudents.classList.add('active');
    if (cardStudents) cardStudents.style.display = 'block';
    if (cardInvoices) cardInvoices.style.display = 'none';
  } else if (tab === 'invoices') {
    if (btnInvoices) btnInvoices.classList.add('active');
    if (cardStudents) cardStudents.style.display = 'none';
    if (cardInvoices) cardInvoices.style.display = 'block';
  } else {
    if (btnBoth) btnBoth.classList.add('active');
    if (cardStudents) cardStudents.style.display = 'block';
    if (cardInvoices) cardInvoices.style.display = 'block';
  }
}

function openHostelOneTimeTravelSection() {
  navigateTo('finances');
  switchFinancesTab('both');
  setTimeout(() => {
    scrollToHostelOneTimeSection();
  }, 120);
}

function scrollToHostelOneTimeSection() {
  const section = document.getElementById('hostelOneTimeSection');
  if (section) {
    if (section.style.display === 'none') {
      switchFinancesTab('both');
    }
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    section.classList.remove('highlight-section-flash');
    void section.offsetWidth;
    section.classList.add('highlight-section-flash');
    setTimeout(() => {
      section.classList.remove('highlight-section-flash');
    }, 2600);
  }
}

function updateHostelMetrics(dataset) {
  const allData = HOSTEL_ONE_TIME_DATA;
  const monthTrips = allData.length;
  const monthTotal = monthTrips * 150;

  const todayData = allData.filter(d => d.date === '2026-10-15');
  const todayTrips = todayData.length;
  const todayTotal = todayTrips * 150;

  // Today's Collection single metric
  const todayTotalEl = document.getElementById('hostelKpiTodayTotal');
  if (todayTotalEl) todayTotalEl.textContent = `₹${todayTotal.toLocaleString('en-IN')}`;

  const todayTripsEl = document.getElementById('hostelKpiTodayTrips');
  if (todayTripsEl) todayTripsEl.textContent = `${todayTrips} One-Time Boardings`;

  // Update tab badge count
  const tabCountEl = document.getElementById('finStudentsTabCount');
  if (tabCountEl) tabCountEl.textContent = monthTrips;

  // Sync Home Card 4
  const dashCount = document.getElementById('dashHostelPassCount');
  if (dashCount) dashCount.textContent = monthTrips;

  const dashAmount = document.getElementById('dashHostelAmountText');
  if (dashAmount) dashAmount.textContent = `₹150 per trip • Total : ₹${monthTotal.toLocaleString('en-IN')}`;

  // Sync Finances Card 5
  const finCollection = document.getElementById('finHostelCollectionTotal');
  if (finCollection) finCollection.textContent = `₹${monthTotal.toLocaleString('en-IN')}`;

  const finTripsSub = document.getElementById('finHostelTripsSub');
  if (finTripsSub) finTripsSub.textContent = `₹150 per trip`;
}

function renderHostelOneTimeTable(dataToRender = null) {
  const tbody = document.getElementById('hostelOneTimeTbody');
  if (!tbody) return;

  const list = dataToRender !== null ? dataToRender : HOSTEL_ONE_TIME_DATA;
  updateHostelMetrics(list);

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 36px 16px; color: var(--text-muted);">
          <i class="ph ph-receipt-x" style="font-size: 32px; display: block; margin: 0 auto 8px auto; opacity: 0.6;"></i>
          No records in Time Traveler Ledger.
        </td>
      </tr>
    `;
    const counterEl = document.getElementById('hostelLedgerCounter');
    if (counterEl) counterEl.textContent = 'Showing 0 verified one-time travel records';
    return;
  }

  tbody.innerHTML = list.map(item => `
    <tr>
      <td style="white-space: nowrap;">
        <span style="font-size: 13px; font-weight: 500; color: var(--text-primary);">${item.dateOnly}</span>
      </td>
      <td>
        <div class="hostel-student-name">${item.studentName}</div>
        <div class="hostel-student-prn" style="font-family: var(--font-mono); font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">${item.rollNo}</div>
      </td>
      <td>
        <span style="font-weight: 600; font-size: 12.5px; color: var(--text-primary);">${item.busName}</span>
      </td>
      <td>
        <span style="font-size: 12.5px; color: var(--text-secondary); font-weight: 500;">
          ${item.routeDirection}
        </span>
      </td>
      <td style="text-align: center;">
        <button type="button" class="hostel-btn-slip" onclick="viewHostelReceipt('${item.id}')" title="View & print official transit receipt slip">
          <i class="ph ph-receipt"></i> Slip
        </button>
      </td>
    </tr>
  `).join('');

  const counterEl = document.getElementById('hostelLedgerCounter');
  if (counterEl) {
    counterEl.textContent = `Showing ${list.length} verified one-time travel records`;
  }
}

function exportHostelLedgerCSV() {
  const data = HOSTEL_ONE_TIME_DATA;
  const headers = ['Date', 'Student Name', 'Roll Number', 'Bus', 'Route'];
  const rows = data.map(item => [
    `"${item.dateOnly}"`,
    `"${item.studentName.replace(/"/g, '""')}"`,
    `"${item.rollNo}"`,
    `"${item.busName}"`,
    `"${item.routeDirection}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Time_Traveler_Ledger_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`Exported ${data.length} records to CSV`);
}

function viewHostelReceipt(id) {
  const item = HOSTEL_ONE_TIME_DATA.find(d => d.id === id);
  if (!item) return;

  const rctNumber = document.getElementById('rctNumber');
  if (rctNumber) rctNumber.textContent = item.receiptNo;

  const rctDateTime = document.getElementById('rctDateTime');
  if (rctDateTime) rctDateTime.textContent = `${item.dateOnly}, 08:00 AM`;

  const rctStudentName = document.getElementById('rctStudentName');
  if (rctStudentName) rctStudentName.textContent = item.studentName;

  const rctRollNo = document.getElementById('rctRollNo');
  if (rctRollNo) rctRollNo.textContent = item.rollNo;

  const rctHostel = document.getElementById('rctHostel');
  if (rctHostel) rctHostel.textContent = item.hostel || 'Hostel Resident';

  const rctCorridor = document.getElementById('rctCorridor');
  if (rctCorridor) rctCorridor.textContent = `${item.busName} • ${item.routeDirection}`;

  const rctPayMode = document.getElementById('rctPayMode');
  if (rctPayMode) rctPayMode.textContent = item.payMode || 'UPI (Digital)';

  const rctUTR = document.getElementById('rctUTR');
  if (rctUTR) rctUTR.textContent = item.utr || 'UTR-VERIFIED';

  const modal = document.getElementById('viewHostelReceiptModal');
  if (modal) modal.classList.remove('hidden');
}

function closeViewHostelReceiptModal() {
  const modal = document.getElementById('viewHostelReceiptModal');
  if (modal) modal.classList.add('hidden');
}

function printHostelReceipt() {
  const printArea = document.getElementById('receiptPrintArea');
  if (!printArea) {
    window.print();
    return;
  }

  const win = window.open('', '_blank', 'width=500,height=600');
  if (win) {
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>MIT ADT University - One-Time Transit Boarding Slip</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 20px;
            color: #111827;
            background: #fff;
          }
          .receipt-print {
            border: 1px solid #E5E7EB;
            padding: 24px;
            border-radius: 8px;
            max-width: 440px;
            margin: 0 auto;
          }
          .title { font-size: 16px; font-weight: 800; letter-spacing: 0.05em; margin: 0; }
          .subtitle { font-size: 12px; color: #6B7280; margin: 3px 0 12px 0; }
          .badge { display: inline-block; font-size: 11px; font-weight: 700; color: #10B981; border: 1px solid #A7F3D0; background: #ECFDF5; padding: 2px 8px; border-radius: 4px; }
          .divider { border-bottom: 2px dashed #E5E7EB; margin: 12px 0 16px 0; }
          .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; }
          .label { color: #6B7280; font-size: 11px; text-transform: uppercase; font-weight: 600; }
          .val { font-weight: 600; color: #111827; text-align: right; }
          .fare-box { background: #FFF7ED; border: 1px solid #FFEDD5; border-radius: 6px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; margin: 16px 0; }
          .fare-amount { font-size: 20px; font-weight: 800; color: #EA580C; }
          .footer-note { text-align: center; font-size: 11px; color: #9CA3AF; font-family: monospace; border-top: 1px dashed #E5E7EB; padding-top: 12px; }
        </style>
      </head>
      <body>
        <div class="receipt-print">
          <div style="display:flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="title">MIT ADT UNIVERSITY</div>
              <div class="subtitle">Campus Transportation Division (CTD)</div>
            </div>
            <span class="badge">VERIFIED & BOARDED</span>
          </div>
          <div class="divider"></div>
          <div class="row"><span class="label">Receipt Number</span><span class="val" style="font-family: monospace;">${document.getElementById('rctNumber')?.textContent || ''}</span></div>
          <div class="row"><span class="label">Issue Date</span><span class="val">${document.getElementById('rctDateTime')?.textContent || ''}</span></div>
          <div class="row"><span class="label">Student Name</span><span class="val">${document.getElementById('rctStudentName')?.textContent || ''}</span></div>
          <div class="row"><span class="label">Roll Number</span><span class="val" style="font-family: monospace;">${document.getElementById('rctRollNo')?.textContent || ''}</span></div>
          <div class="row"><span class="label">Bus & Route</span><span class="val">${document.getElementById('rctCorridor')?.textContent || ''}</span></div>
          <div class="fare-box">
            <span style="font-size: 12px; font-weight: 600;">One-Time Transit Fare</span>
            <span class="fare-amount">₹150.00</span>
          </div>
          <div class="footer-note">* * * OFFICIAL BOARDING SLIP • MIT CTD * * *</div>
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 500);
          };
        </script>
      </body>
      </html>
    `);
    win.document.close();
  } else {
    window.print();
  }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderRoutesDirectory();
  renderUniversityBuses();
  renderUniversityDrivers();
  renderDedicatedDrivers();
  populateTripBusSelect();
  updateUnivKPIs();
  renderChatConversations();
  renderChatMessages(CHAT_DATA[0]);
  renderComplaints();
  updateComplaintsKPIs();
  renderPassengers();
  updatePassengersKPIs();
  renderHostelOneTimeTable();

  // Settings initial render
  renderSettingsUsersTable();
  renderSettingsBusesTable();
  renderSettingsDriversTable();
  renderSettingsRoutesTable();

  setTimeout(initDashboardMap, 150);
});

// Automatic map dimension sync on window load and resize
window.addEventListener('load', () => {
  setTimeout(() => {
    if (AppState.dashMap) AppState.dashMap.invalidateSize();
    if (AppState.routeDetailMap) AppState.routeDetailMap.invalidateSize();
  }, 100);
});

window.addEventListener('resize', () => {
  if (AppState.dashMap) AppState.dashMap.invalidateSize();
  if (AppState.routeDetailMap) AppState.routeDetailMap.invalidateSize();
});
