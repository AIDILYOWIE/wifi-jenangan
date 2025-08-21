<?php

namespace App\Http\Controllers\Kolektor;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use App\Models\Tagihan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use function Illuminate\Events\queueable;

class KolektorController extends Controller
{

    public function generateKodePelanggan()
    {
        $lastPelanggan = Pelanggan::orderBy('id', 'desc')->first();

        $nextId = $lastPelanggan ? $lastPelanggan->id + 1 : 1;
        $kodePelanggan = 'PL-' . str_pad($nextId, 4, '0', STR_PAD_LEFT);

        return response()->json([
            "new_kode_pelanggan" => $kodePelanggan
        ]);
    }


    private function prepareDataKolektor($request, $method = null)
    {
        $rules = [
            'name' => ['required', 'min:3'],
            'email' => ['required'],
            'oldPassword' => $method == 'update' ? ['required'] : ['nullable'],
            'password' => ['required'],
            'confirm_password' => ['required', 'same:password'],
        ];

        $validate = $request->validate($rules);

        $validate['password'] = bcrypt($validate['password']);

        return $validate;
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $take = $request->take ? $request->take : 10;
        try {
            $kolektor = User::whereHas('role', function ($q) {
                $q->where('name', 'collector');
            })->orderByDesc('id')->paginate($take);

            return response()->json([
                'message' => 'List kolektor berhasil diambil.',
                'data' => $kolektor
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mendapatkan list kolektor!',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data_kolektor = $this->prepareDataKolektor($request);
        try {
            User::create($data_kolektor);
            return response()->json([
                'message' => 'Kolektor berhasil ditambahkan.',
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Gagal menambahkan kolektor.',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $kolektor = User::findOrFail($id);
            return response()->json([
                'message' => 'Detail kolektor berhasil diambil.',
                'data' => $kolektor
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Kolektor tidak ditemukan"
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pelanggan = User::findOrFail($id);

        $data_pelanggan = $this->prepareDataKolektor($request, 'update');

        if (!empty($data_pelanggan['oldPassword'])) {
            if (!Hash::check($data_pelanggan['oldPassword'], $pelanggan->password)) {
                return response()->json([
                    'message' => "Password lama tidak sama!"
                ], 422);
            }
        }

        $pelanggan->update($data_pelanggan);

        return response()->json([
            'message' => 'Data pelanggan berhasil diperbarui.',
            'data' => $pelanggan
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kolektor = User::findOrFail($id);
        $kolektor->delete();

        return response()->json([
            'message' => 'Kolektor berhasil dihapus.'
        ]);
    }
}
