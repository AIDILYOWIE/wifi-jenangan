<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use App\Models\Tagihan;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr;

class TagihanController extends Controller
{
    public function index(Request $request)
    {

        $request->validate([
            "now" => ['required', 'date'],
        ]);

        $now = $request->only('now');

        try {
            $tagihan = Tagihan::with('pelanggan.paket')->where('tanggal', '<=', $now)->where('status', 'belum lunas')->orderBy('tanggal', 'asc')->paginate(10);
            return response()->json([
                'message' => "Data Tagihan Didapatkan!",
                'data' => $tagihan
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Data Tagihan Gagal Didapatkan!",
                'error' => $e->getMessage()
            ]);
        }
    }

    public function indexTagihanLunas(Request $request)
    {

        $request->validate([
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date']
        ]);

        $data   = $request->only('start_date', 'end_date');
        $query  = Tagihan::with('pelanggan.paket')->orderBy('tanggal', 'asc');

        try {
            if ($data) {
                $start = Carbon::parse($data['start_date'])->startOfDay();
                $end   = Carbon::parse($data['end_date'])->endOfDay();
                $query->whereBetween('tanggal', [$start, $end]);
            }

            $tagihan = $query->paginate(10);

            return response()->json([
                'message' => "Data Tagihan Didapatkan!",
                'data' => $tagihan,
                "payload" => [
                    $start, $end
                ]
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Data Tagihan Gagal Didapatkan!",
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show(string $id)
    {
        try {
            $tagihan = Tagihan::with('pelanggan.paket')->find($id);
            return response()->json([
                'message' => "Detail tagihan didapatkan!",
                "data" => $tagihan
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Detail tagihan tidak didapatkan!",
                'error' => $e->getMessage()
            ]);
        }
    }


    public function confirmTagihan(Request $request, $id)
    {
        $tagihan = Tagihan::with('pelanggan.paket')->find($id);

        DB::beginTransaction();

        try {
            $tagihan->status = 'Lunas';
            $tagihan->save();

            $tanggal_sebelumnya = Carbon::parse($tagihan->tanggal);
            $tanggal_tagihan_selanjutnya = $tanggal_sebelumnya->copy()->addMonthNoOverflow()->day(20);

            setlocale(LC_TIME, 'id_ID');
            $nama_bulan = $tanggal_tagihan_selanjutnya->isoFormat('MMMM');

            $tagihan_selanjutnya = Tagihan::create([
                'id_pelanggan' => $tagihan->pelanggan->id,
                'name' => 'tagihan ' . $nama_bulan,
                'tanggal' => $tanggal_tagihan_selanjutnya,
                'total_tagihan' => $tagihan->pelanggan->paket->harga,
                'status' => 'Belum Lunas'
            ]);

            DB::commit();
            return response()->json([
                'message' => "Tagihan berhasil di konfirmasi!",
                'tagihan_terkonfirmasi' => $tagihan,
                'tagihan_selanjutnya' => $tagihan_selanjutnya
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => "Gagal Mengkonfirmasi Tagihan!",
                "error" => $e->getMessage()
            ]);
        }
    }
}
