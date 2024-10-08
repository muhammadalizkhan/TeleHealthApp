// navigation/StackNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen';
// import DetailsScreen from '../screens/DetailsScreen';
import Welcome from '../onboarding/onboarding1';
import Onboarding2 from '../onboarding/onboarding2';
import Onboarding3 from '../onboarding/onboarding3';
import SignIn from '../auth/sign-in';
// import ForgetPassword from '../auth/sign-in';
// import Resetpassword from '../auth/reset-password';
// import SignUp from '../auth/forget-password';
import HomeScreen from '../home/home-screen';
import DoctorProfile from '../appointment/doctor-profile';
import ScheduleAappointmnet from '../appointment/schedule-appointment';
import ConfirmAppointment from '../appointment/confirm-appointment';
import Index from '../schedule/index1';
import RoleLogin from '../auth/role-login';
import MedicalRecord from '../prescription/medical-record';
import Prescription from '../prescription/prescription';
import DiagnosticCenter from '../prescription/diagnostic-center';
import DoctorScreen from '../doctorprofile/doctor-profile';
import PatientRecord from '../doctorprofile/patientRecord/patient-record';
import PatientDetail from '../doctorprofile/patientRecord/patient-detail';
import PatientPrescription from '../doctorprofile/patientPrescription/patient-prescription';
import PatientRecordComponent from '../doctorprofile/patientRecord/component/patient-record-component';
import ParentScreen from '../home/parent-screen';
import VideoCall from '../agora/video-call-screen';
import Index1 from '../doctorSchedule/index1';
import UpcomingSchedule from '../doctorSchedule/upcoming-schedule';
import DParentScreen from '../doctorprofile/d-parent-screen';
import Splash from '../auth';
import Notifications from '../notification/notifications';
import UpdateScreen from '../UpdateScreen';
import DiagnosticCenterScreen from '../DiagnosticCenterScreen';
import UpdateDScreen from '../UpdateDoctor';
import StripeGateway from "../appointment/payments";
import DiagnosticCenterDetail from "../DiagnosticCenterScreen/CenterDetails";
import submitBooking from "../DiagnosticCenterScreen/SubmitBooking";
import PrescriptionScreen from "../doctorprofile/patientRecord/AddPrescription";
import Meeting from '../doctorSchedule/meeting';
import UserResults from "../TestRecords/LabTestRecords";
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="homescreen">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="onboarding2" component={Onboarding2} options={{ headerShown: false }} />
        <Stack.Screen name="onboarding3" component={Onboarding3} options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" component={SignIn} options={{ headerShown: false }} />
        {/* <Stack.Screen name="forgot-password" component={ForgetPassword}  options={{ headerShown: false }}/>
        <Stack.Screen name="reset-password" component={Resetpassword}  options={{ headerShown: false }}/>
        <Stack.Screen name="sign-up" component={SignUp}  options={{ headerShown: false }}/>
        <Stack.Screen name="verification-code" component={VerificationCode}  options={{ headerShown: false }}/> */}
        <Stack.Screen name="homescreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="doctor-profile" component={DoctorProfile} options={{ headerShown: false }} />
        <Stack.Screen name="schedule-appointment" component={ScheduleAappointmnet} options={{ headerShown: false }} />
        <Stack.Screen name="confirm-appointment" component={ConfirmAppointment} options={{ headerShown: false }} />
        <Stack.Screen name="schedule-index" component={Index} options={{ headerShown: false }} />
        <Stack.Screen name="role-login" component={RoleLogin} options={{ headerShown: false }} />
        <Stack.Screen name="medical-record" component={MedicalRecord} options={{ headerShown: false }} />
        <Stack.Screen name="prescription" component={Prescription} options={{ headerShown: false }} />
        <Stack.Screen name="diagnostic-center" component={DiagnosticCenter} options={{ headerShown: false }} />
        {/* <Stack.Screen name="doctor-screen" component={DoctorScreen}  options={{ headerShown: false }}/> */}
        <Stack.Screen name="patient-record" component={PatientRecord} options={{ headerShown: false }} />
        <Stack.Screen name="patient-detail" component={PatientDetail} options={{ headerShown: false }} />
        <Stack.Screen name="patient-prescription" component={PatientPrescription} options={{ headerShown: false }} />
        <Stack.Screen name="patient-record-component" component={PatientRecordComponent} options={{ headerShown: false }} />
        <Stack.Screen name="parentscreen" component={ParentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="video-call" component={VideoCall} options={{ headerShown: false }} />
        <Stack.Screen name="doctor-schedule" component={Index1} options={{ headerShown: false }} />
        <Stack.Screen name="UpcomingSchedule" component={UpcomingSchedule} options={{ headerShown: false }} />
        <Stack.Screen name="DParent-screen" component={DParentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="notifications" component={Notifications} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateScreen" component={UpdateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DiagnosticCenterScreen" component={DiagnosticCenterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateDScreen" component={UpdateDScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StripeGateway" component={StripeGateway} options={{ headerShown: false }} />
        <Stack.Screen name="CenterDetail" component={DiagnosticCenterDetail} options={{ headerShown: false }} />
        <Stack.Screen name="submitBooking" component={submitBooking} options={{ headerShown: false }} />
        <Stack.Screen name="PrescriptionScreen" component={PrescriptionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Meeting" component={Meeting} options={{ headerShown: false }} />
        <Stack.Screen name="UserResults" component={UserResults} options={{ headerShown: false }} />

        {/*StripeGateway*/}


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
