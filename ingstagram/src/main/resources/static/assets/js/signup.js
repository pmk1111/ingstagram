new Vue({
    el: '.app',
    data: {
        contextPath: '',
        iconPath: '',
        inputs: [
            { name: 'email', placeholder: '이메일 주소', value: '', isValid: false, isChecked: false, validate: 'validateEmail' },
            { name: 'name', placeholder: '성명', value: '', isValid: false, isChecked: false, validate: 'validateName' },
            { name: 'nic', placeholder: '사용자 이름', value: '', isValid: false, isChecked: false, validate: 'validateNic' },
            { name: 'phone', placeholder: '휴대폰 번호', value: '', isValid: true, isChecked: false, validate: 'validatePhone' },
            { name: 'pw', placeholder: '비밀번호', value: '', isValid: false, isChecked: false, validate: 'validatePw' }
        ],
        isSubmitButtonActive: false,
        userInfo: {
            email: '',
            name: '',
            nic: '',
            phone: '',
            pw: '',
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

            const isOrderThenFifth = new Date().getFullYear() - parseInt(year) > 5;
            console.log(isOrderThenFifth);

            this.orderThenFifth = isOrderThenFifth
        });
    	},
    	checkVerifyLength: function(){
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
        validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        validateName(name) {
            return name.trim() !== '';
        },
        validateNic(nic) {
            //서버로 비동기 호출
            // axios.get('/checknic', {
            // params: {
            // nic: nic
            // }
            // }).then(response => {
            // if (response.data) {
            // this.inputs.find(input => input.name === 'nic').isValid = true;
            // } else {
            // this.inputs.find(input => input.name === 'nic').isValid = false;
            // console.log('이미 사용 중인 사용자 이름입니다.');
            // }
            // }).catch(error => {
            // console.error(error);
            // });
            return true;
        },
        validatePhone(phone) {
            if (phone === '') {
                return true;
            }
            const koreanPhoneRegex = /^01[016789]\d{7,8}$/;
            const usaPhoneRegex = /^\d{10}$/;
            return koreanPhoneRegex.test(phone) || usaPhoneRegex.test(phone);
        },
        validatePw(pw) {
            return pw.length >= 6;
        },
        saveAccountInfo() {
            if (this.isSubmitButtonActive) {
                this.userInfo.email = document.querySelector('[name=email]').value;
                this.userInfo.name = document.querySelector('[name=name]').value;
                this.userInfo.nic = document.querySelector('[name=nic]').value;
                this.userInfo.phone = document.querySelector('[name=phone]').value;
                this.userInfo.pw = document.querySelector('[name=pw]').value;
								
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
        saveBirth(){
        	console.log('orderThenFifth:', this.orderThenFifth);
        	if(this.orderThenFifth){
						const userBirth = this.selectedYear + "-" + this.selectedMonth + "-" + this.selectedDay;
        		this.userInfo.birth = userBirth;
        		console.table(this.userInfo);
        		
        		let birthLayer = document.querySelector('.set-birth');
        		let verifyLayer = document.querySelector('.verify');
        		
        		birthLayer.style.display = 'none';
        		verifyLayer.style.display = 'block';
        	}
        },
        handlePhoneInput(){
        	const phoneVal = document.querySelector('[name=phone]').value
        	if(phoneVal === ''){
        	this.inputs[3].isValid = true; 
        		this.inputs[3].isChecked = true; 
        		this.isSubmitButtonActive = this.inputs.every(input => input.isValid);
        	}
        },
        backToInfo(){
        	let infoLayer = document.querySelector('.info-layer');
        	let birthLayer = document.querySelector('.set-birth');
        	
        	if(birthLayer.style.display == 'block' && infoLayer.style.display == 'none'){
    				infoLayer.style.display = 'flex';
    				birthLayer.style.display = 'none';		
        	} 
        },
        backToBirth(){
        	let birthLayer = document.querySelector('.set-birth');
        	let verifyLayer = document.querySelector('.verify');
        	
        	if(verifyLayer.style.display == 'block' && birthLayer.style.display == 'none'){
    				birthLayer.style.display = 'block';
    				verifyLayer.style.display = 'none';		
        	} 
        },
        openModal(){
       		birthModal= document.querySelector('.birth-modal')
        	if(birthModal.style.display = 'none'){
        		birthModal.style.display = 'block';
        		this.isModalOpen = true;
        	}
        },
        closeModal(){
        	birthModal= document.querySelector('.birth-modal')
        	if(birthModal.style.display = 'block'){
        		birthModal.style.display = 'none';
        		this.isModalOpen = false;
        	}
        }
    }

});

