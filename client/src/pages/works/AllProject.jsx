// import React from 'react'
// import { useGetAllProjectQuery } from '../../redux/api/projectApi'
// const AllProject = () => {
//     const { data, error, isLoading } = useGetAllProjectQuery()
//     console.log(data);
    
//     if(isLoading) return <h1>Loading...</h1>
//   return (
//        <div className="bg-[var(--color-primary)] pt-10 pb-30 flex flex-col items-center justify-center">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 w-[90%] md:w-full max-w-7xl">
//         {data?.project?.map((data) => (
//           <div
//             key={data.id}
//             className="relative flex flex-col items-center justify-center"
//           >
//             <div className="w-full aspect-square max-w-[350px] p-[10px] sm:p-[16px] overflow-hidden shadow-lg">
//               <img
//                 src={data.image}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                 alt={`Work ${data.id}`}
//                 loading="lazy"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
// )
// }

// export default AllProject