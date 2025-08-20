<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use App\Models\Tagihan;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Date;
use PhpParser\Node\Expr;

class TagihanController extends Controller
{
    public function getInvoice(Request $request)
    {
        $request->validate([
            "now" => ['required', 'date'],
            "filter" => ['nullable', 'string']
        ]);

        $desa = $request->input('filter');
        $now = $request->input('now');

        try {
            $tagihan = Tagihan::with('pelanggan.paket')
                ->where('tanggal', '<=', $now)
                ->where('status', 'belum lunas')
                ->when($desa && strtolower($desa) !== 'all', function ($query) use ($desa) {
                    $query->whereHas('pelanggan', function ($q) use ($desa) {
                        $desaLower = strtolower($desa);
                        $q->whereRaw('LOWER(desa) LIKE ?', ['%' . $desaLower . '%'])
                            ->orWhereRaw('LOWER(kecamatan) LIKE ?', ['%' . $desaLower . '%']);
                    });
                })

                ->orderBy('tanggal', 'asc')
                ->paginate(10);

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


    public function getTransaksi(Request $request)
    {
        $request->validate([
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date']
        ]);

        $query = Tagihan::with('pelanggan.paket')
            ->orderBy('tanggal', 'desc');

        try {
            $startDate = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : null;
            $endDate   = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : null;

            if ($startDate && !$endDate) {
                // Start date saja → sampai sekarang
                $endDate = Carbon::now()->endOfDay();
                $query->whereBetween('tanggal', [$startDate, $endDate]);
            } elseif ($startDate && $endDate) {
                // Start & end date ada
                $query->whereBetween('tanggal', [$startDate, $endDate]);
            } else {
                // Default bulan ini
                $nowDate = Carbon::now();
                $startDate = $nowDate->copy()->startOfMonth();
                $endDate = $nowDate->copy()->endOfMonth();
                $query->whereBetween('tanggal', [$startDate, $endDate]);
            }

            $tagihan = $query->paginate(10);

            return response()->json([
                'message' => "Data Transaksi Didapatkan!",
                'data' => $tagihan
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
            $tanggal_tagihan_selanjutnya = $tanggal_sebelumnya->copy()->addMonthNoOverflow();

            if ($tanggal_sebelumnya->day == 1) {
                $tanggal_tagihan_selanjutnya->day(1);
            } else {
                $tanggal_tagihan_selanjutnya->day(20);
            }

            setlocale(LC_TIME, 'id_ID');
            $nama_bulan = $tanggal_tagihan_selanjutnya->isoFormat('MMMM');

            $tagihan_selanjutnya = Tagihan::create([
                'id_pelanggan' => $tagihan->pelanggan->id,
                'pelanggan_name' => $tagihan->pelanggan->name,
                'pelanggan_kecamatan' => $tagihan->pelanggan->kecamatan,
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
