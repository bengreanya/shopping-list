const SUPABASE_URL = 'https://cvpnauqokinnpwanskbe.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2cG5hdXFva2lubnB3YW5za2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwNDMsImV4cCI6MTk4MzY4NDA0M30.A8Io_J4_NWTx-iVGngaqEBOxKmW8AGDymaSwiRF2Q0Q';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

export async function checkAuth() {
    if (getUser()) {
        location.replace('../');
    }
}
export async function createListItem(item, quantity) {
    const response = await client
        .from('shopping-list')
        .insert({ item: item, quantity: quantity, user_id: client.auth.user().id });
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}
/* Data functions */
export async function getListItems() {
    const response = await client
        .from('shopping-list')
        .select('*')
        .match({ user_id: client.auth.user().id });
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}
export async function editListItem(item) {
    const response = await client
        .from('shopping-list')
        .update({ cross_out: !item.cross_out })
        .match({ id: item.id });
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}
