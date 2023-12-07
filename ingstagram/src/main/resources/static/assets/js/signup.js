import axios from 'https://cdn.skypack.dev/axios';

new Vue({
  el: '.app',
  data: {
  	csrfToken: document.querySelector('meta[name="_csrf"]').getAttribute('content'),
    csrfHeader: document.querySelector('meta[name="_csrf_header"]').getAttribute('content'),
    contextPath: '',
    iconPath: '',
    inputs: [
      { name: 'email', placeholder: '이메일 주소', value: '', isValid: false, isChecked: false, validate: 'validateEmail' },
      { name: 'name', placeholder: '성명', value: '', isValid: false, isChecked: false, validate: 'validateName' },
      { name: 'nic', placeholder: '사용자 이름', value: '', isValid: false, isChecked: false, validate: 'validateNic' },
      { name: 'phone', placeholder: '휴대폰 번호', value: '', isValid: true, isChecked: false, validate: 'validatePhone' },
      { name: 'password', placeholder: '비밀번호', value: '', isValid: false, isChecked: false, validate: 'validatePw' }
    ],
    isSubmitButtonActive: false,
    userInfo: {
      email: '',
      name: '',
      nic: '',
      phone: '',
      password: '',
      birth: '',
    },
    isModalOpen: false,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    years: Array.from({ length: 111 }, (_, i) => new Date().getFullYear() - i), // 오늘로부터 110년 전까지의 연도 목록
    selectedYear: new Date().getFullYear(), // 현재 연도
    selectedMonth: new Date().getMonth() + 1,
    selectedDay: new Date().getDate(),
    days: [],
    orderThenFifth: false,
    checkVerifyLength: '',
    checkVerify: false
  },
  mounted() {
    this.$axios = axios;
    var hostIndex = location.href.indexOf(location.host) + location.host.length;
    this.contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
    this.iconPath = this.contextPath + '/assets/img/facebook2.svg';
    this.validate = this.contextPath + '/assets/img/good.svg';
    this.invalidate = this.contextPath + '/assets/img/bad.svg';

    this.selectedMonth = new Date().getMonth() + 1;
    this.selectedDay = new Date().getDate();
    this.updateDays();

  },
  watch: {
    selectedYear: function () {
      this.$nextTick(function () {
        const year = document.querySelector('[name=year]').value;
        console.log(year);

        const isOrderThenFifth = new Date().getFullYear() - parseInt(year) >= 5;
        console.log(isOrderThenFifth);

        this.orderThenFifth = isOrderThenFifth
      });
    },
    checkVerifyLength: function () {
      const code = document.querySelector('[name=code]').value
      console.log('인증번호 체크' + code.length)
      this.checkVerify = /^\d+$/.test(code) && code.length >= 6;
      console.log(this.checkVerify)
    }
  },
  methods: {
    changeIcon(state) {
      this.iconPath = this.contextPath + '/assets/img/facebook2' + state + '.svg';
    },
    validateInput(index) {
      if (this.inputs[index].value === '') {
        return;
      }

      var validationMethod = this[this.inputs[index].validate];
      if (typeof validationMethod === 'function') {
        this.inputs[index].isValid = validationMethod(this.inputs[index].value);
        this.inputs[index].isChecked = true;
      }

      this.isSubmitButtonActive = this.inputs.every(input => input.isValid);
    },
    resetInput(index) {
      this.inputs[index].isChecked = false;
    },
    async validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      try {
        const response = await axios.get(this.contextPath + '/account/check-email', {
          params: {
            email: email
          }
        });
        if (!re.test(String(email).toLowerCase())) {
          console.log('유효하지 않은 이메일 형식입니다.');
          this.inputs.find(input => input.name === 'email').isValid = false;
          this.isSubmitButtonActive = this.inputs.every(input => input.isValid);
          return false;
        }
        else if (response.data === false) {
          this.inputs.find(input => input.name === 'email').isValid = true;
          console.log('사용 가능한 이메일입니다.');
          this.isSubmitButtonActive = this.inputs.every(input => input.isValid);

        } else if (response.data === true) {
          this.inputs.find(input => input.name === 'email').isValid = false;
          console.log('이미 사용 중인 사용자 이메일입니다.');
          this.isSubmitButtonActive = this.inputs.every(input => input.isValid);
        }
      } catch (error) {
        console.error(error);
        return false; // 에러가 발생하면 유효하지 않음을 반환
      }
    },


    validateName(name) {
      return name.trim() !== '';
    },
    async validateNic(nic) {
      try {
        const response = await axios.get(this.contextPath + '/account/check-nic', {
          params: {
            nic: nic
          }
        });

        if (response.data === false) {
          this.inputs.find(input => input.name === 'nic').isValid = true;
          console.log('사용 가능한 사용자 이름입니다.');
          this.isSubmitButtonActive = this.inputs.every(input => input.isValid);
          return true;
        } else {
          this.inputs.find(input => input.name === 'nic').isValid = false;
          console.log('이미 사용 중인 사용자 이름입니다.');
          this.isSubmitButtonActive = this.inputs.every(input => input.isValid);
          return false;
        }
      } catch (error) {
        console.error(error);
        return false; // 에러가 발생하면 유효하지 않음을 반환
      }
    },
    validatePhone(phone) {
      if (phone === '') {
        return true;
      }
      const koreanPhoneRegex = /^01[016789]\d{7,8}$/;
      const usaPhoneRegex = /^\d{10}$/;
      return koreanPhoneRegex.test(phone) || usaPhoneRegex.test(phone);
    },
    validatePw(password) {
      return password.length >= 6;
    },
    saveAccountInfo() {
      if (this.isSubmitButtonActive) {
        this.userInfo.email = document.querySelector('[name=email]').value;
        this.userInfo.name = document.querySelector('[name=name]').value;
        this.userInfo.nic = document.querySelector('[name=nic]').value;
        this.userInfo.phone = document.querySelector('[name=phone]').value;
        this.userInfo.password = document.querySelector('[name=password]').value;

        let infoLayer = document.querySelector('.info-layer');
        let birthLayer = document.querySelector('.set-birth');

        infoLayer.style.display = 'none';
        birthLayer.style.display = 'block';

        console.table(this.userInfo);
      }
    },
    updateDays: function () {
      var selectedMonth = this.selectedMonth;
      var selectedYear = this.selectedYear;
      var daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    },
    saveBirth() {
      console.log('orderThenFifth:', this.orderThenFifth);
      if (this.orderThenFifth) {
        const userBirth = this.selectedYear + "-" + this.selectedMonth + "-" + this.selectedDay;
        this.userInfo.birth = userBirth;
        console.table(this.userInfo);

        let birthLayer = document.querySelector('.set-birth');
        let verifyLayer = document.querySelector('.verify');

        birthLayer.style.display = 'none';
        verifyLayer.style.display = 'block';
      }
      let email = this.userInfo.email;
      console.log('전송 받을 메일: ' + email);
      this.$axios
        .post(this.contextPath + "/account/email-verify", { email: email },
              {headers: 
              	{'X-CSRF-TOKEN': this.csrfToken,},
      	})
        .then((res) => {
          console.log('메일을 받은 이메일: ' + this.userInfo.email)
          console.log(res.status);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    isValidNum() {
      let code = document.querySelector('.code');
      if (this.checkVerify) {
        this.$axios
          .post(this.contextPath + "/account/check-verify-num", { code: code.value })
          .then((res) => {
            console.log('인증번호 체크 결과: ' + res);
            if (res) {
              console.log('인증번호 입력 성공');
             	console.table(this.userInfo);
              this.$axios
                .post(this.contextPath + "/account/signup-success", this.userInfo)
                .then((res) => {
                  if(res){
                  	console.log('회원가입 성공, 로그인 페이지로 이동')
                  	window.location.href = this.contextPath + "/login";
                  } else{
                  	console.log('회원 정보 저장 실패');
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } else if (!res) {
              console.log('인증번호가 일치하지 않습니다.')
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    handlePhoneInput() {
      const phoneVal = document.querySelector('[name=phone]').value
      if (phoneVal === '') {
        this.inputs[3].isValid = true;
        this.inputs[3].isChecked = true;
        this.isSubmitButtonActive = this.inputs.every(input => input.isValid);
      }
    },
    backToInfo() {
      let infoLayer = document.querySelector('.info-layer');
      let birthLayer = document.querySelector('.set-birth');

      if (birthLayer.style.display == 'block' && infoLayer.style.display == 'none') {
        infoLayer.style.display = 'flex';
        birthLayer.style.display = 'none';
      }
    },
    backToBirth() {
      let birthLayer = document.querySelector('.set-birth');
      let verifyLayer = document.querySelector('.verify');

      if (verifyLayer.style.display == 'block' && birthLayer.style.display == 'none') {
        birthLayer.style.display = 'block';
        verifyLayer.style.display = 'none';
      }
    },
    openModal() {
      birthModal = document.querySelector('.birth-modal')
      if (birthModal.style.display = 'none') {
        birthModal.style.display = 'block';
        this.isModalOpen = true;
      }
    },
    closeModal() {
      birthModal = document.querySelector('.birth-modal')
      if (birthModal.style.display = 'block') {
        birthModal.style.display = 'none';
        this.isModalOpen = false;
      }
    }
  }

});

