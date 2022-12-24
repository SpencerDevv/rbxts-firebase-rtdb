# @rbxts/firebase-rtdb - **IN PROGRESS**

roblox-ts typings for RBLX-Firebase for Firebase's **RealTime DataBase**

## Example Usage
```ts
import FirebaseService from "@rbxts/firebase-rtdb"
const Firebase = FirebaseService("YOUR DB URL", "YOUR AUTH KEY");

const BansData = Firebase.GetFirebase("Bans"); // Gets the Firebase at the directory "Bans"
const [banSuccess] = BansData.SetAsync("Player_UID", true); // sets the key "Player_UID" to the value true (returns true if successful)
const isBanned = BansData.GetAsync("Player_UID"); // gets the value at key "Player_UID" (in this case it will return true)
const [unbanSuccess] = BansData.DeleteAsync("Player_UID"); // deletes the key "Player_UID" from the datastore (returns true if successful)

// example for unbanning key if math.random() >= 0.5
BansData.UpdateAsync("Player_UID", (old) => {
    if (old !== true) return old;
    if (math.random() < 0.5) return old;
    
    return undefined;
});
```
