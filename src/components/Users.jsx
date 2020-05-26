

export class validation{

    static User(mail,pass){
        const Users = [
            {email:'numan_3434@hotmail.com', password:'123'},
            {email:'ahmet@hotmail.com', password:'12345'},
            {email:'cenkergun@hotmail.com', password:'357'},
            {email:'semih-sahin@gmail.com', password:'456'}
        ]
        for(var i=0; i<Users.length; i++){
            if(mail===Users[i].email && pass===Users[i].password){
               
                return true;
                
                //! !!! BREAK KOYMAYA GEREK YOK.RETURN DEMEK ZATEN FONKSİYONDAN ÇIK DEMEK.RETURN TRUE OLDUĞU ZAMAN DİREK ÇIKAR.
            }
        }
        return false;
    }
         
    
}
 // ? EĞER BİRDEN FAZLA DEĞER DÖNECEKSEN  OBJECT İÇERİSİNDE GERİYE BİR OBJECT DÖNEBİLİRSİN




