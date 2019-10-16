
export const userRow = (user) => {
    return `
    <tr>
        <td>${user.name}</td>
        <td>${user._id}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td scope="row"><button class="btn btn-info" data-toggle="modal" 
            data-target="#edit-user-modal" _id="${user._id}" 
            onclick="editUser(this)"><i class="fa fa-cogs"></i></button></td>
        <td scope="row"><button class="btn btn-danger" _id="${user._id}" 
            onclick="removeUser(this)"><i class="fa fa-trash"></i></button></td>
    </tr>
    `
}
