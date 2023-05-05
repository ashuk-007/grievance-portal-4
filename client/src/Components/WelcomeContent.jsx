import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";    
import location from "../Images/location.png";
import Loading from "./Loading";
export default function WelcomeContent() {
  const password = React.useRef();
  const cPassword = React.useRef();
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [cPasswordClass, setCPasswordClass] = React.useState("form-control");
  const [isCPasswordDirty, setIsCPasswordDirty] = React.useState(false);

  React.useEffect(() => {
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass("form-control is-valid");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("form-control is-invalid");
      }
    }
  }, [isCPasswordDirty]);

  const checkPasswords = (e) => {
    setIsCPasswordDirty(true);
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass("form-control is-valid");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("form-control is-invalid");
      }
    }
  };
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    district: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

const navigate=useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.current.value != cPassword.current.value) {
    alert("Passwords do not match");}
    else if(data.name=="" || data.email=="" || data.password=="" || data.age=="" || data.phone=="" || data.district==""){
      alert("Please fill all the fields");
    }
    else if(password.current.value.length<6){
      alert("password should be minimum 6 characters")
    }
    else if(data.age<18){
      alert("Age should be greater than 18")
    }
    else{
      data.district = data.district[0].toUpperCase() + data.district.slice(1);
      console.log(data)
      setLoading(true);
   try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        data
      );
      setLoading(false);
      alert("User created successfully")
      console.log(response)
       navigate("/userlogin", {
         state: {
           token: response.data.token,
         },
         replace: true,
       });
    } catch (error) {
      console.log(error);
      alert("User already exists");
    }
  
} 
  }
  const districts = [
    "Adilabad",
    "Agar Malwa",
    "Agra",
    "Ahmedabad",
    "Ahmednagar",
    "Airport Quarantine",
    "Aizawl",
    "Ajmer",
    "Akola",
    "Alappuzha",
    "Aligarh",
    "Alipurduar",
    "Alirajpur",
    "Almora",
    "Alwar",
    "Ambala",
    "Ambedkar Nagar",
    "Amethi",
    "Amravati",
    "Amreli",
    "Amritsar",
    "Amroha",
    "Anand",
    "Anantapur",
    "Anantnag",
    "Angul",
    "Anjaw",
    "Anuppur",
    "Araria",
    "Aravalli",
    "Ariyalur",
    "Arwal",
    "Ashoknagar",
    "Auraiya",
    "Aurangabad",
    "Ayodhya",
    "Azamgarh",
    "BSF Camp",
    "Bagalkote",
    "Bageshwar",
    "Baghpat",
    "Bahraich",
    "Baksa",
    "Balaghat",
    "Balangir",
    "Balasore",
    "Ballari",
    "Ballia",
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bametara",
    "Banaskantha",
    "Banda",
    "Bandipora",
    "Banka",
    "Bankura",
    "Banswara",
    "Barabanki",
    "Baramulla",
    "Baran",
    "Bareilly",
    "Bargarh",
    "Barmer",
    "Barnala",
    "Barpeta",
    "Barwani",
    "Bastar",
    "Basti",
    "Bathinda",
    "Beed",
    "Begusarai",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Betul",
    "Bhadohi",
    "Bhadradri Kothagudem",
    "Bhadrak",
    "Bhagalpur",
    "Bhandara",
    "Bharatpur",
    "Bharuch",
    "Bhavnagar",
    "Bhilwara",
    "Bhind",
    "Bhiwani",
    "Bhojpur",
    "Bhopal",
    "Bidar",
    "Bijapur",
    "Bijnor",
    "Bikaner",
    "Bilaspur",
    "Birbhum",
    "Bishnupur",
    "Biswanath",
    "Bokaro",
    "Bongaigaon",
    "Botad",
    "Boudh",
    "Budaun",
    "Budgam",
    "Bulandshahr",
    "Buldhana",
    "Bundi",
    "Burhanpur",
    "Buxar",
    "CAPF Personnel",
    "Cachar",
    "Central Delhi",
    "Chamarajanagara",
    "Chamba",
    "Chamoli",
    "Champawat",
    "Champhai",
    "Chandauli",
    "Chandel",
    "Chandigarh",
    "Chandrapur",
    "Changlang",
    "Charaideo",
    "Charkhi Dadri",
    "Chatra",
    "Chengalpattu",
    "Chennai",
    "Chhatarpur",
    "Chhindwara",
    "Chhota Udaipur",
    "Chikkaballapura",
    "Chikkamagaluru",
    "Chirang",
    "Chitradurga",
    "Chitrakoot",
    "Chittoor",
    "Chittorgarh",
    "Churachandpur",
    "Churu",
    "Coimbatore",
    "Cooch Behar",
    "Cuddalore",
    "Cuttack",
    "Dadra and Nagar Haveli",
    "Dahod",
    "Dakshin Bastar Dantewada",
    "Dakshin Dinajpur",
    "Dakshina Kannada",
    "Daman",
    "Damoh",
    "Dang",
    "Darbhanga",
    "Darjeeling",
    "Darrang",
    "Datia",
    "Dausa",
    "Davanagere",
    "Dehradun",
    "Deogarh",
    "Deoghar",
    "Deoria",
    "Devbhumi Dwarka",
    "Dewas",
    "Dhalai",
    "Dhamtari",
    "Dhanbad",
    "Dhar",
    "Dharmapuri",
    "Dharwad",
    "Dhemaji",
    "Dhenkanal",
    "Dholpur",
    "Dhubri",
    "Dhule",
    "Dibrugarh",
    "Dima Hasao",
    "Dimapur",
    "Dindigul",
    "Dindori",
    "Diu",
    "Doda",
    "Dumka",
    "Dungarpur",
    "Durg",
    "East Champaran",
    "East Delhi",
    "East Garo Hills",
    "East Godavari",
    "East Jaintia Hills",
    "East Kameng",
    "East Khasi Hills",
    "East Siang",
    "East Sikkim",
    "East Singhbhum",
    "Ernakulam",
    "Erode",
    "Etah",
    "Etawah",
    "Evacuees",
    "Faridabad",
    "Faridkot",
    "Farrukhabad",
    "Fatehabad",
    "Fatehgarh Sahib",
    "Fatehpur",
    "Fazilka",
    "Ferozepur",
    "Firozabad",
    "Foreign Evacuees",
    "Gadag",
    "Gadchiroli",
    "Gajapati",
    "Ganderbal",
    "Gandhinagar",
    "Ganganagar",
    "Ganjam",
    "Garhwa",
    "Gariaband",
    "Gaurela Pendra Marwahi",
    "Gautam Buddha Nagar",
    "Gaya",
    "Ghaziabad",
    "Ghazipur",
    "Gir Somnath",
    "Giridih",
    "Goalpara",
    "Godda",
    "Golaghat",
    "Gomati",
    "Gonda",
    "Gondia",
    "Gopalganj",
    "Gorakhpur",
    "Gumla",
    "Guna",
    "Guntur",
    "Gurdaspur",
    "Gurugram",
    "Gwalior",
    "Hailakandi",
    "Hamirpur",
    "Hanumangarh",
    "Hapur",
    "Harda",
    "Hardoi",
    "Haridwar",
    "Hassan",
    "Hathras",
    "Haveri",
    "Hazaribagh",
    "Hingoli",
    "Hisar",
    "Hnahthial",
    "Hojai",
    "Hooghly",
    "Hoshangabad",
    "Hoshiarpur",
    "Howrah",
    "Hyderabad",
    "Idukki",
    "Imphal East",
    "Imphal West",
    "Indore",
    "Italians",
    "Jabalpur",
    "Jagatsinghpur",
    "Jagtial",
    "Jaipur",
    "Jaisalmer",
    "Jajpur",
    "Jalandhar",
    "Jalaun",
    "Jalgaon",
    "Jalna",
    "Jalore",
    "Jalpaiguri",
    "Jammu",
    "Jamnagar",
    "Jamtara",
    "Jamui",
    "Jangaon",
    "Janjgir Champa",
    "Jashpur",
    "Jaunpur",
    "Jayashankar Bhupalapally",
    "Jehanabad",
    "Jhabua",
    "Jhajjar",
    "Jhalawar",
    "Jhansi",
    "Jhargram",
    "Jharsuguda",
    "Jhunjhunu",
    "Jind",
    "Jiribam",
    "Jodhpur",
    "Jogulamba Gadwal",
    "Jorhat",
    "Junagadh",
    "Kabeerdham",
    "Kaimur",
    "Kaithal",
    "Kakching",
    "Kalaburagi",
    "Kalahandi",
    "Kalimpong",
    "Kallakurichi",
    "Kamareddy",
    "Kamjong",
    "Kamle",
    "Kamrup",
    "Kamrup Metropolitan",
    "Kancheepuram",
    "Kandhamal",
    "Kangpokpi",
    "Kangra",
    "Kannauj",
    "Kannur",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kanyakumari",
    "Kapurthala",
    "Karaikal",
    "Karauli",
    "Karbi Anglong",
    "Kargil",
    "Karimganj",
    "Karimnagar",
    "Karnal",
    "Karur",
    "Kasaragod",
    "Kasganj",
    "Kathua",
    "Katihar",
    "Katni",
    "Kaushambi",
    "Kendrapara",
    "Kendujhar",
    "Khagaria",
    "Khammam",
    "Khandwa",
    "Khargone",
    "Khawzawl",
    "Kheda",
    "Khordha",
    "Khowai",
    "Khunti",
    "Kinnaur",
    "Kiphire",
    "Kishanganj",
    "Kishtwar",
    "Kodagu",
    "Koderma",
    "Kohima",
    "Kokrajhar",
    "Kolar",
    "Kolasib",
    "Kolhapur",
    "Kolkata",
    "Kollam",
    "Komaram Bheem",
    "Kondagaon",
    "Koppal",
    "Koraput",
    "Korba",
    "Koriya",
    "Kota",
    "Kottayam",
    "Kozhikode",
    "Kra Daadi",
    "Krishna",
    "Krishnagiri",
    "Kulgam",
    "Kullu",
    "Kupwara",
    "Kurnool",
    "Kurukshetra",
    "Kurung Kumey",
    "Kushinagar",
    "Kutch",
    "Lahaul and Spiti",
    "Lakhimpur",
    "Lakhimpur Kheri",
    "Lakhisarai",
    "Lakshadweep",
    "Lalitpur",
    "Latehar",
    "Latur",
    "Lawngtlai",
    "Leh",
    "Lepa Rada",
    "Lohardaga",
    "Lohit",
    "Longding",
    "Longleng",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Lucknow",
    "Ludhiana",
    "Lunglei",
    "Madhepura",
    "Madhubani",
    "Madurai",
    "Mahabubabad",
    "Mahabubnagar",
    "Maharajganj",
    "Mahasamund",
    "Mahe",
    "Mahendragarh",
    "Mahisagar",
    "Mahoba",
    "Mainpuri",
    "Majuli",
    "Malappuram",
    "Malda",
    "Malkangiri",
    "Mamit",
    "Mancherial",
    "Mandi",
    "Mandla",
    "Mandsaur",
    "Mandya",
    "Mansa",
    "Mathura",
    "Mau",
    "Mayiladuthurai",
    "Mayurbhanj",
    "Medak",
    "Medchal Malkajgiri",
    "Meerut",
    "Mehsana",
    "Mirpur",
    "Mirzapur",
    "Moga",
    "Mokokchung",
    "Mon",
    "Moradabad",
    "Morbi",
    "Morena",
    "Morigaon",
    "Mulugu",
    "Mumbai",
    "Mumbai Suburban",
    "Mungeli",
    "Munger",
    "Murshidabad",
    "Muzaffarabad",
    "Muzaffarnagar",
    "Muzaffarpur",
    "Mysuru",
    "Nabarangapur",
    "Nadia",
    "Nagaon",
    "Nagapattinam",
    "Nagarkurnool",
    "Nagaur",
    "Nagpur",
    "Nainital",
    "Nalanda",
    "Nalbari",
    "Nalgonda",
    "Namakkal",
    "Namsai",
    "Nanded",
    "Nandurbar",
    "Narayanpet",
    "Narayanpur",
    "Narmada",
    "Narsinghpur",
    "Nashik",
    "Navsari",
    "Nawada",
    "Nayagarh",
    "Neemuch",
    "New Delhi",
    "Nicobars",
    "Nilgiris",
    "Nirmal",
    "Niwari",
    "Nizamabad",
    "Noney",
    "North 24 Parganas",
    "North Delhi",
    "North East Delhi",
    "North Garo Hills",
    "North Goa",
    "North Sikkim",
    "North Tripura",
    "North West Delhi",
    "North and Middle Andaman",
    "Nuapada",
    "Nuh",
    "Osmanabad",
    "Pakke Kessang",
    "Pakur",
    "Palakkad",
    "Palamu",
    "Palghar",
    "Pali",
    "Palwal",
    "Panchkula",
    "Panchmahal",
    "Panipat",
    "Panna",
    "Papum Pare",
    "Parbhani",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Patan",
    "Pathanamthitta",
    "Pathankot",
    "Patiala",
    "Patna",
    "Pauri Garhwal",
    "Peddapalli",
    "Perambalur",
    "Peren",
    "Phek",
    "Pherzawl",
    "Pilibhit",
    "Pithoragarh",
    "Porbandar",
    "Prakasam",
    "Pratapgarh",
    "Prayagraj",
    "Puducherry",
    "Pudukkottai",
    "Pulwama",
    "Punch",
    "Pune",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Puri",
    "Purnia",
    "Purulia",
    "Rae Bareli",
    "Raichur",
    "Raigad",
    "Raigarh",
    "Railway Quarantine",
    "Raipur",
    "Raisen",
    "Rajanna Sircilla",
    "Rajgarh",
    "Rajkot",
    "Rajnandgaon",
    "Rajouri",
    "Rajsamand",
    "Ramanagara",
    "Ramanathapuram",
    "Ramban",
    "Ramgarh",
    "Rampur",
    "Ranchi",
    "Ranga Reddy",
    "Ranipet",
    "Ratlam",
    "Ratnagiri",
    "Rayagada",
    "Reasi",
    "Rewa",
    "Rewari",
    "Ribhoi",
    "Rohtak",
    "Rohtas",
    "Rudraprayag",
    "Rupnagar",
    "S.A.S. Nagar",
    "S.P.S. Nellore",
    "Sabarkantha",
    "Sagar",
    "Saharanpur",
    "Saharsa",
    "Sahibganj",
    "Saiha",
    "Saitual",
    "Salem",
    "Samastipur",
    "Samba",
    "Sambalpur",
    "Sambhal",
    "Sangareddy",
    "Sangli",
    "Sangrur",
    "Sant Kabir Nagar",
    "Saraikela-Kharsawan",
    "Saran",
    "Satara",
    "Satna",
    "Sawai Madhopur",
    "Sehore",
    "Senapati",
    "Seoni",
    "Serchhip",
    "Shahdara",
    "Shahdol",
    "Shahid Bhagat Singh Nagar",
    "Shahjahanpur",
    "Shajapur",
    "Shamli",
    "Sheikhpura",
    "Sheohar",
    "Sheopur",
    "Shi Yomi",
    "Shimla",
    "Shivamogga",
    "Shivpuri",
    "Shopiyan",
    "Shrawasti",
    "Siang",
    "Siddharthnagar",
    "Siddipet",
    "Sidhi",
    "Sikar",
    "Simdega",
    "Sindhudurg",
    "Singrauli",
    "Sipahijala",
    "Sirmaur",
    "Sirohi",
    "Sirsa",
    "Sitamarhi",
    "Sitapur",
    "Sivaganga",
    "Sivasagar",
    "Siwan",
    "Solan",
    "Solapur",
    "Sonbhadra",
    "Sonipat",
    "Sonitpur",
    "South 24 Parganas",
    "South Andaman",
    "South Delhi",
    "South East Delhi",
    "South Garo Hills",
    "South Goa",
    "South Salmara Mankachar",
    "South Sikkim",
    "South Tripura",
    "South West Delhi",
    "South West Garo Hills",
    "South West Khasi Hills",
    "Sri Muktsar Sahib",
    "Srikakulam",
    "Srinagar",
    "State Pool",
    "Subarnapur",
    "Sukma",
    "Sultanpur",
    "Sundargarh",
    "Supaul",
    "Surajpur",
    "Surat",
    "Surendranagar",
    "Surguja",
    "Suryapet",
    "Tamenglong",
    "Tapi",
    "Tarn Taran",
    "Tawang",
    "Tehri Garhwal",
    "Tengnoupal",
    "Tenkasi",
    "Thane",
    "Thanjavur",
    "Theni",
    "Thiruvallur",
    "Thiruvananthapuram",
    "Thiruvarur",
    "Thoothukkudi",
    "Thoubal",
    "Thrissur",
    "Tikamgarh",
    "Tinsukia",
    "Tirap",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvannamalai",
    "Tonk",
    "Tuensang",
    "Tumakuru",
    "Udaipur",
    "Udalguri",
    "Udham Singh Nagar",
    "Udhampur",
    "Udupi",
    "Ujjain",
    "Ukhrul",
    "Umaria",
    "Una",
    "Unnao",
    "Unokoti",
    "Upper Dibang Valley",
    "Upper Siang",
    "Upper Subansiri",
    "Uttar Bastar Kanker",
    "Uttar Dinajpur",
    "Uttara Kannada",
    "Uttarkashi",
    "Vadodara",
    "Vaishali",
    "Valsad",
    "Varanasi",
    "Vellore",
    "Vidisha",
    "Vijayapura",
    "Vikarabad",
    "Viluppuram",
    "Virudhunagar",
    "Visakhapatnam",
    "Vizianagaram",
    "Wanaparthy",
    "Warangal Rural",
    "Warangal Urban",
    "Wardha",
    "Washim",
    "Wayanad",
    "West Champaran",
    "West Delhi",
    "West Garo Hills",
    "West Godavari",
    "West Jaintia Hills",
    "West Kameng",
    "West Karbi Anglong",
    "West Khasi Hills",
    "West Siang",
    "West Sikkim",
    "West Singhbhum",
    "West Tripura",
    "Wokha",
    "Y.S.R. Kadapa",
    "Yadadri Bhuvanagiri",
    "Yadgir",
    "Yamunanagar",
    "Yanam",
    "Yavatmal",
    "Zunheboto",
  ];
  async function handleLocation () {
     try {
       const position = await new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
           (position) => resolve(position),
           (error) => reject(error)
         );
       });
       const lat = position.coords.latitude;
       const long = position.coords.longitude;
    
       const response = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
       );

       const result = response.data;
       console.log(result.city)
       const city = result.city;
       if(districts.includes(city)){
       setData((prev)=>({
        ...prev,
        district:`${city}`
       }));
      alert(`district has been set to ${city}}`);
       }
       else{
        alert('The current location is not a valid district')
       }
     } catch (error) {
      alert(`Error: ${error.message}`);
     }
   };

   React.useEffect(() => {
    console.log(data)
   },[data])
   const [loading,setLoading]=React.useState(false)

     const togglePasswordVisibility = () => {
       setShowPassword(!showPassword);
     };
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
      <div className="welcome-content flex-row md:flex justify-between md:h-100">
        <div className="w-full md:w-2/3 h-64 ">
          <h1 className="pl-0 md:pl-32 text-center md:text-left text-5xl md:text-7xl pt-16 md:pt-48 font-semibold text-dark-blue">
            WELCOME TO
            <br /> <span className="text-6xl md:text-9xl">आवाज़</span>
          </h1>
          <h3 className="text-center md:text-left pl-0 md:pl-32 text-l md:text-2xl text-dark-blue mt-2 md:mt-6 mb-8 md:mb-0">
            An initiative by Government of India
          </h3>
        </div>
        <div className="w-3/4 m-auto mt-2 mb-10  md:mb-0 md:m-0 rounded-md md:rounded-none md:w-1/3 bg-dark-blue overflow-hidden">
          <h1 className="text-3xl md:text-4xl text-white ml-16 md:ml-0 md:text-left  md:pl-16 pt-8 md:pt-20 md:mb-8">
            SIGN UP
          </h1>
          <div action="">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mt-4 mb-4 md:m-0 md:mt-4"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
              onChange={handleChange}
            />
            <div className="flex justify-center items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password(min 6)"
                className="form-control w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
                ref={password}
                onChange={handleChange}
              />
              <button
                onClick={togglePasswordVisibility}
                className="text-white p-2 rounded-3xl m-auto  "
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              className={
                cPasswordClass +
                ` w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4`
              }
              onChange={checkPasswords}
              ref={cPassword}
            />
            <input
              type="phone"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              className="form-control w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
              onChange={handleChange}
            />

            <div className="w-80 hidden justify-between mt-4 ml-16 md:flex md:visible">
              <select
                value={data.district}
                name="district"
                onChange={handleChange}
                className="rounded-md w-48 p-2 md:p-3"
              >
                <option value="">-- Select District --</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="Age(>18)"
                className="rounded-md w-24 p-2 md:p-3"
                onChange={handleChange}
              />
            </div>
            <div className="md:hidden">
              <input
                type="text"
                name="district"
                id="district"
                value={data.district}
                placeholder="District"
                className="w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
                onChange={handleChange}
              />
              <select
                value={data.district}
                name="district"
                onChange={handleChange}
                className="w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
              >
                <option value="">-- Select District --</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="age(>18)"
                className="w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
                onChange={handleChange}
              />
            </div>
            <div className="m-auto md:ml-16 ml-12 mb-8">
              <div className="flex items-center mt-4 text-white">
                <button type="button" onClick={handleLocation}>
                  <img src={location} alt="" className="h-6 w-6" />
                </button>
                <h4>Click to set your location</h4>
              </div>
              <h3 className="text-white mt-4">
                Already have an account?{" "}
                <NavLink to="/userlogin" className="text-light-green">
                  Login
                </NavLink>
              </h3>
            </div>
            <div className="w-80 flex justify-center mt-2 md:mt-2 ml-16  ">
              <button
                type="submit"
                className="hover:animate-bounce ml-0 md:ml-16 md:w-48 bg-light-green text-white p-3 rounded-3xl m-auto mb-4 md:m-auto  "
                onClick={handleSubmit}
              >
                Create Account
              </button>
              {loading && <Loading />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
