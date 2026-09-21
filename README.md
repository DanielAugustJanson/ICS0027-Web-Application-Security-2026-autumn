# ICS0027-Web-Application-Security-2026-autumn-
Public repository for the project regarding Taltech Course of ICS0027

# LockyV3 - The Web Bogaloo

Web-Based Secure Password Manager.

Checkpoint 1, threat model and architecture (Week 4)


## Deliverables. A short design document plus an initialised repository.

Architecture below is kept simple as to not over-promise. During development, issues or improvements can be made and plans readjusted. 

### System architecture diagram showing the browser, the application and the database,
indicating where credentials are encrypted and where the trust boundaries are.

![Schema](Images-Schemas/ICS00027%20Web%20Security%20Chart.png)


### Threat model mapped to the OWASP Top 10 and the attack classes covered in

#### A01:2025 - Broken Access Control
-Not performing Verification for each request -

Verify each request for user by checking session and it's state. No action besides retrieving public kdf-salt can be done on Database without verifying by database first.

#### A02:2025 - Security Misconfiguration
- Enabled features that might cause security issues or exposing data

Enforce Generic Error messages. Leave real problems to logs on server side.

#### A03:2025 - Software Supply Chain Failures
- Using old/untrusted packages. (eg "cool animations npm pack") that was last updated in 2008, and since carries 90 Billion critical security issues

Keeping pakcages updated ( or sometimes intentionally not). Installing ONLY what is needed and with good support/verfication.
`npm audit` 

#### A04:2025 - Cryptographic Failures
- Having outdated cryptographic solutions or not using them correctly. Reusing passwords, salts and IV's

Using TESTED and ACCEPTED algorythms for cryptographic functions. Argon2id for KDF. Randomizing salts and using non-pattern IV's


#### A05:2025 - Injection
- SQL injections. Cross-Site-Scripting & More

Using SQL purification, preferably not allowing user direct access to SQL commands. For others, relying on NextJS dev's to do their best :)


#### A06:2025 - Insecure Design
- Storing MasterKey or data in cahced mode, where they can be accessed outside of authenticated session.

Store sensitive data in temporary memory, something that is wiped the moment site is closed. Force wipe when session timer (on client side) expires.

#### A07:2025 - Authentication Failures
- Gaining accessing using stolen cookies or session

Having minimal expiery date for sessions. 


#### A08:2025 - Software or Data Integrity Failures
- Corruption while uploading or ManInMiddle attacks

Have a failsafe if upload of content hangs. Not store partial data (that might corrupt database for user).


#### A09:2025 - Security Logging and Alerting Failures
- Not knowing last access time or not having alerts for failures (eg wrong password). Rate-Limit user/IP logins.

Store login times & failed attempts for users
Preferably return last login state upon each successful login. Notify user about failed attempts in recent times.

#### A10:2025 - Mishandling of Exceptional Conditions
- Not considering impractical states or exeptions that might occur

Have 0 trust towards client/user side and verify every action. 


### Cryptographic design: how the master password derives the key, what is encrypted

#### Registration

1) User upon registration inputs master password and generates a kdf-salt
2) Using Argon2id, it creates a two keys: MasterKey and AuthHash
3) Hash along with salt is password is sent to server
4) Server (after basic account checks) hashes AuthHash by it's own side algorythm and stores Hashed(AuthHash) with public kdf-salt
5) If okay, returns OK Message, that user can login now

#### Login & Usage

1) User inputs username, and receives from server public kdf-salt
2) With public kdf-salt, inputs password and again generates MasterKey (Stored in Browser memory) and AuthKey
3) AuthKey is sent to server for validation. Server hashes the hash and checks db. If everything is correct, returns JWT cookie or HTTPonly session.
4) User recieves their vault

A) - If no valut data exists, then returns unencrypted empty data object: [] or similar
B) - If data exists, as encryped blob with IV (nonce). Data is decrypted in browser using MasterKey

5) User makes his changes (adds passwords) and when is ready submits presses post. 
6) Browser validates (if no data changed then no reason to send (Maybe using Hashing to check))
7) Vault blob is encrypted using MasterKey with a random (nonce) and sent over to server (with nonce)

### Planned authentication and session model, including cookie flags, expiry, fixation
Cookie Policy: HttpOnly, Secure, SameSite=Strict
Session Type: Stateful Database Session stored in SQLite
Absolute Lifetime: 1 hour maximum
Idle Timeout: 15min
For simplicity sake, at this point session on screen timer might be added to indicate expire of session. Might be improved on later.


### Repository initialised with a README stating the scope, the planned routes and
features, and how to run it locally.

WIP, at this point project is to be run with "Great Imagination"

