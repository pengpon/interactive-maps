import Swal from 'sweetalert2'

const dialog = (title, text, confirmText, cancelText = '取消') => {
  return Swal.fire({
    backdrop: `rgba(0, 0, 0, 0.6)`,
    position: 'center',
    title: title,
    text: text,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    showConfirmButton: true,
    showCancelButton: true,
    toast: false,
    customClass: {
      popup: 'dialog',
      title: 'dialog-title',
      htmlContainer: 'dialog-text',
      confirmButton: 'dialog-btn confirm',
      cancelButton: 'dialog-btn cancel'
    },
    didOpen: (dialog) => {
      dialog.addEventListener('click', Swal.close)
    }
  })
}

const statusToast = (type, icon, title, timer) => {
  let iconHtml = `<span class="material-symbols-rounded">${icon}</span`

  Swal.fire({
    position: 'top-end',
    iconHtml: iconHtml,
    title: title,
    toast: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp animate__faster'
    },
    timer: timer,
    showConfirmButton: false,
    customClass: {
      popup: `toast toast--${type}`,
      title: 'toast-title'
    },
    didOpen: (toast) => {
      toast.addEventListener('click', Swal.close)
    }
  })
}

const loadingToast = (type, icon, title, timer) => {
  let iconHtml = `
    <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`

  return Swal.fire({
    position: 'top-end',
    iconHtml: iconHtml,
    title: title,
    toast: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp animate__faster'
    },
    timer: timer,
    showConfirmButton: false,
    customClass: {
      popup: `toast toast--${type}`,
      title: 'toast-title'
    },
    didOpen: () => {
      Swal.stopTimer()
    }
  })
}

export { dialog, statusToast, loadingToast }
