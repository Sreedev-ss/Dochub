import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Navbar from '../../components/Common/Navbar/Navbar';
import Sidebar from '../../components/Common/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

function randomID(len: number) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(
    url = window.location.href
) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}

export default function VideoChat() {
    const navigate = useNavigate()
    const roomID = getUrlParams().get('roomID') || randomID(5);
    let myMeeting = async (element: any) => {

        // generate Kit Token
        const appID = 882789919;
        const serverSecret = "6b1b1ddaedcf543860d9a4f4834e07e1";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

        // Create instance object from Kit Token.
        const zp: any = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Appointment link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            onLeaveRoom: () => {
                    navigate('/doctor/appointments')
              }
        });
    };

    return (
        <>
            {/* <Navbar />
            <Sidebar /> */}
            <div
                className="myCallContainer"
                ref={myMeeting}
                style={{ width: '100vw', height: '80vh' }}
            >
            </div>
        </>
    );
}