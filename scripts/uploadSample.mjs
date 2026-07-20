import supabase from '../src/services/supabase.js';
import { bookings as sampleBookings } from '../src/data/data-bookings.js';
import { cabins as sampleCabins } from '../src/data/data-cabins.js';
import { guests as sampleGuests } from '../src/data/data-guests.js';
import { subtractDates } from '../src/utils/helpers.js';

async function run() {
  try {
    console.log('Deleting existing bookings...');
    let res = await supabase.from('bookings').delete().gt('id', 0);
    if (res.error) throw res.error;

    console.log('Deleting existing guests...');
    res = await supabase.from('guests').delete().gt('id', 0);
    if (res.error) throw res.error;

    console.log('Deleting existing cabins...');
    res = await supabase.from('cabins').delete().gt('id', 0);
    if (res.error) throw res.error;

    console.log('Inserting guests...');
    res = await supabase.from('guests').insert(sampleGuests).select('id').order('id');
    if (res.error) throw res.error;
    const insertedGuestIds = res.data.map((r) => r.id);

    console.log('Inserting cabins...');
    res = await supabase.from('cabins').insert(sampleCabins).select('id').order('id');
    if (res.error) throw res.error;
    const insertedCabinIds = res.data.map((r) => r.id);

    console.log('Preparing bookings payload...');
    const finalBookings = sampleBookings.map((booking) => {
      const cabin = sampleCabins.at(booking.cabinId - 1);
      const numNight = subtractDates(booking.endDate, booking.startDate);
      const cabinPrice = numNight * (cabin.regularPrice - cabin.discount);
      const extrasPrice = booking.hasBreakfast ? numNight * 15 * booking.numGuests : 0;
      const totalPrice = cabinPrice + extrasPrice;

      // determine status roughly like uploader
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      let Status = 'unconfirmed';
      const today = new Date();
      if (end < today && end.toDateString() !== today.toDateString()) Status = 'checked-out';
      else if ((end >= today) && start < today && start.toDateString() !== today.toDateString()) Status = 'checked-in';

      return {
        created_at: booking.created_at,
        startDate: booking.startDate,
        endDate: booking.endDate,
        numNight,
        numGuest: booking.numGuests,
        cabinPrice,
        ExtraPrice: extrasPrice,
        totalPrice,
        Status,
        hasBreakfast: booking.hasBreakfast,
        isPaid: booking.isPaid,
        observation: booking.observations ?? booking.observation ?? '',
        cabinId: insertedCabinIds.at(booking.cabinId - 1),
        guestId: insertedGuestIds.at(booking.guestId - 1),
      };
    });

    console.log('Inserting bookings... (this may take a moment)');
    res = await supabase.from('bookings').insert(finalBookings).select('id, startDate, endDate, guestId, cabinId, Status');
    if (res.error) throw res.error;

    console.log('Inserted bookings count:', res.data.length);
    console.log('Sample inserted rows:', res.data.slice(0, 5));
    console.log('Upload completed successfully.');
  } catch (err) {
    console.error('Upload failed:', err.message || err);
    process.exitCode = 1;
  }
}

run();
