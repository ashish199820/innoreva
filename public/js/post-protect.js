// $(function () {
//     console.log("script is running")
//     // writing Ajax to send data from client side to the server side.
//     $('.project-btn').on('click', function () {
//       token = localStorage.getItem('token_user');
//       console.log("token sent for client side "+ token)
//         $.ajax({
//             url: 'http://localhost:3000/post',
//             data: {'token':token.toString()},
//             type: 'POST',
//             success: function (data) {
//                 console.log(data)
//             },
//             error: function (xhr, status, error) {
//                 console.log('Error: ' + error.message);
//             },
//         });
//     })

// });