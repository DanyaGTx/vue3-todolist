export const checkSelectValidation = () => {
    return [
      (value: string) => {
        if (value) {
          return true
        } else {
          return 'Category is required.'
        }
      },
    ]
  }
  
export const checkTitleValidation = () => {
    return [
        (value: string) => {
          if (value) {
            return true
          } else {
            return 'Name is requred.'
          }
        },
        (value: string) => {
          if (value?.length <= 50) {
            return true
          } else {
            return 'Name must be less than 50 characters.'
          }
        },
      ]
  }