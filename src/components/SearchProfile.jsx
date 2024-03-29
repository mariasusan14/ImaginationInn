import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';

const UserProfileSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      // Search for the user based on username or email
      const q = query(
        collection(db, 'user'),
        where('email', '==', searchTerm)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If no user found, display an error message
        setSearchResult(null);
        setError('User not found'); 
      } else {
        // If user found, display the user profile data
        const userData = querySnapshot.docs[0].data();
        setSearchResult(userData);
        setError('');
      }
    } catch (error) {
      console.error('Error searching for user:', error);
      setError('An error occurred while searching for the user');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter username or email"
      />
      <button onClick={handleSearch}>Search</button>

      {searchResult && (
        <div>
          <Link to={`/viewuser/${searchResult.userId}`}>
            <h2>User Profile</h2>
          </Link>
          <p>Fullname: {searchResult.fullname}</p>
          <p>Email: {searchResult.email}</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default UserProfileSearch; 


// import React, { useState } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import { Link } from 'react-router-dom';

// const UserProfileSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [error, setError] = useState('');

//   const handleSearch = async () => {
//     try {
//       // Search for the user based on username or email
//       const q = query(
//         collection(db, 'user'),
        
//         where('email', '==', searchTerm)
//       );

//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.empty) {
//         // If no user found, display an error message
//         setSearchResult(null);
//         setError('User not found');
//       } else {
//         // If user found, display the user profile data
//         const userData = querySnapshot.docs[0].data();
//         setSearchResult(userData);
//         setError('');
//       }
//     } catch (error) {
//       console.error('Error searching for user:', error);
//       setError('An error occurred while searching for the user');
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Enter username or email"
//       />
//       <button onClick={handleSearch}>Search</button>

//       {searchResult && (
//         <div>
//           <Link to={"/viewuser"}><h2>User Profile</h2></Link>
//           <p>Username: {searchResult.username}</p>
//           <p>Email: {searchResult.email}</p>
//         </div>
//       )}

//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default UserProfileSearch;
