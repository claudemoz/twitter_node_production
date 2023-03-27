window.addEventListener('DOMContentLoaded', ()=>{
  // const imageProfile = document.querySelector('#image-profile');
  const inputAvatar = document.querySelector('#input-avatar');
  const formContainer = document.querySelector('#form-container');
  
  formContainer.addEventListener('click', ()=>{
    inputAvatar.click()
  })

  inputAvatar.addEventListener('change', ()=>{
    formContainer.submit()
  })
})