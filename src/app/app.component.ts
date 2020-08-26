import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notZOOM';
  OT : any;
  
  apiKey = "46897534";
  sessionId = "1_MX40Njg5NzUzNH5-MTU5ODQzNTk4NTM4M35yMVNrQm5pdU5wNGd1b3R0ODJFTWk2RGF-fg";
  token = "T1==cGFydG5lcl9pZD00Njg5NzUzNCZzaWc9MWE0MjI3NDkyMzk2ODA3Y2Y5M2QyMzgyYjBkZmUzZGFmNTNmMDc5ZjpzZXNzaW9uX2lkPTFfTVg0ME5qZzVOelV6Tkg1LU1UVTVPRFF6TlRrMk9URXhObjQxVjNaamR6TjJUR3RDTjBObk5rWlBjV1JaVVZWTmMwZC1mZyZjcmVhdGVfdGltZT0xNTk4NDM2MDA5Jm5vbmNlPTAuMTQ3MTUxNDMzNzA5MjE4OCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk4NDM5NjA4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// Handling all of our errors here by alerting them
 handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
initializeSession();

 initializeSession() {
  var session = OT.initSession(this.apiKey, this.sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, this.handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, this.handleError);

  // Connect to the session
  session.connect(this.token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      this.handleError(error);
    } else {
      session.publish(publisher, this.handleError);
    }
  });
}


}
